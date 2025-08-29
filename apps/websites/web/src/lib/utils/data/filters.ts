// lib/data/filters.ts
import { Store, Derived } from "@tanstack/react-store";

export type Operation = "intersect" | "union";

export type FilterKey = string;

export type FilterDescriptor =
    | FilterKey
    | {
    key: FilterKey;
    negate?: boolean;
};

export type FilterRequest = {
    filters: FilterDescriptor[];
    mode?: Operation;
};

export function createFilterEngine<T>(
    source: Store<T[]>,
    filters: Record<FilterKey, (item: T) => boolean>,
    defaultMode: Operation = "intersect"
) {
    return (request: FilterRequest): Derived<T[]> => {
        const { filters: descriptors, mode } = request;
        const effectiveMode = mode ?? defaultMode;

        const activeFilters = descriptors
            .map((descriptor) => {
                const key = typeof descriptor === "string" ? descriptor : descriptor.key;
                const negate = typeof descriptor === "object" && descriptor.negate;
                const base = filters[key];
                if (!base) return undefined;
                return negate ? (item: T) => !base(item) : base;
            })
            .filter(Boolean) as ((item: T) => boolean)[];

        const fn = () => {
            return source.state.filter((item) => {
                if (activeFilters.length === 0) return true;
                return effectiveMode === "intersect"
                    ? activeFilters.every((f) => f(item))
                    : activeFilters.some((f) => f(item));
            });
        };

        const derived = new Derived<T[]>({
            fn,
            deps: [source],
        });

        derived.mount();
        return derived;
    };
}
