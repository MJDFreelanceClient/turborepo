// Factory for building the store
import {Derived, Store} from "@tanstack/react-store";
import {arrayToRecord} from "@/lib/utils/logic";

function debounce<F extends (...args: any[]) => void>(fn: F, delay = 300): F {
    let timeout: ReturnType<typeof setTimeout>;
    return ((...args: any[]) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn(...args), delay);
    }) as F;
}

interface BuildStoreOptions {
    storageKey?: string;
    saveDelay?: number;
    version?: number;
    migrate?: (raw: any) => any; // Optional migration logic
}

export const buildStore = <T extends { id: string }>(
    defaultState: T[],
    options?: BuildStoreOptions) => {
    // Try to hydrate from localStorage
    let initialState = defaultState;

    const {
        storageKey = undefined,
        saveDelay = 500,
        version,
        migrate,
    } = options ?? {};

    if (storageKey && typeof localStorage !== "undefined") {
        try {
            const raw = localStorage.getItem(storageKey);
            if (raw) {
                const parsed = JSON.parse(raw);
                if (parsed && Array.isArray(parsed.state)) {
                    if (!version || parsed.version === version) {
                        initialState = parsed.state;
                    } else if (migrate) {
                        initialState = migrate(parsed.state);
                    }
                }
            }
        } catch (err) {
            console.warn("Failed to load store from localStorage", err);
        }
    }

    const store = new Store<T[]>(initialState);

    const record = new Derived<Record<string, T>>({
        fn: () => arrayToRecord(store.state),
        deps: [store],
    });

    const history: T[][] = [];

    // Push a snapshot of current state to history
    const recordHistory = () => {
        history.push([...store.state]);
    };

    const debouncedRecord = debounce(recordHistory, 500);

    const saveToLocal = () => {
        console.log("saveToLocal", storageKey);
        if (storageKey) {
            const payload = {
                version,
                state: store.state,
            };
            localStorage.setItem(storageKey, JSON.stringify(payload));
        }
    };

    const debounceSaveLocal = debounce(saveToLocal, saveDelay);

    const mutate = (id: string, newValue: T) => {
        store.setState(() => {
            const currentRecord = { ...record.state };
            currentRecord[id] = newValue;
            const updated = Object.values(currentRecord);
            debouncedRecord(); // <-- snapshot *after* mutation (but debounced)
            debounceSaveLocal();
            return Object.values(currentRecord);
        });
    };

    const unmount = record.mount();

    return {
        store,
        record,
        mutate,
        destroy: unmount,
        history,
        clearHistory: () => history.splice(0),
        undo: () => {
            if (history.length > 0) {
                const previous = history.pop();
                if (previous) store.setState(() => previous);
            }
        },
    };
};

export function createFilterMap<T>(
    source: Store<T[]> | T[],
    filters: Record<string, (item: T) => boolean>
): Record<string, Derived<T[]> | T[]> {
    const result: Record<string, Derived<T[]> | T[]> = {};

    if (Array.isArray(source)) {
        for (const key in filters) {
            result[key] = source.filter(filters[key]);
        }
    } else {
        for (const key in filters) {
            result[key] = new Derived({
                fn: () => source.state.filter(filters[key]),
                deps: [source],
            });
            result[key].mount();
        }
    }

    return result;
}

export type Operation = "intersect" | "union";

export function createFilterMultiMap<T>(
    source: Store<T[]>,
    filters: Record<string, (item: T) => boolean>,
    operation: Operation = "intersect"
) {
    return (keys: string[], operationOverride: Operation = operation): Derived<T[]> => {
        const activeFilters = keys.map((key) => filters[key]).filter(Boolean);

        const fn = () => {
            return source.state.filter((item) => {
                if (activeFilters.length === 0) return true;
                if (operation === "intersect") {
                    return activeFilters.every((f) => f(item));
                }
                if (operation === "union") {
                    return activeFilters.some((f) => f(item));
                }
                return true;
            });
        };

        const derived = new Derived<T[]>({
            fn,
            deps: [source],
        });

        derived.mount(); // optional for tracking immediately
        return derived;
    };
}

export function createStaticFilterMultiMap<T>(
    source: T[],
    filters: Record<string, (item: T) => boolean>,
    operation: Operation = "intersect"
) {
    return (keys: string[], operationOverride: Operation = operation): Derived<T[]> => {
        const activeFilters = keys.map((key) => filters[key]).filter(Boolean);

        const fn = () => {
            return source.filter((item) => {
                if (activeFilters.length === 0) return true;
                if (operation === "intersect") {
                    return activeFilters.every((f) => f(item));
                }
                if (operation === "union") {
                    return activeFilters.some((f) => f(item));
                }
                return true;
            });
        };

        const derived = new Derived<T[]>({
            fn,
            deps: [source],
        });

        derived.mount(); // optional for tracking immediately
        return derived;
    };
}