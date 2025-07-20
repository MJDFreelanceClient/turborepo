import { useMemo, useEffect } from "react";
import { Derived } from "@tanstack/react-store";
import { useForm } from "@tanstack/react-form";

type IdObject = { id: string };

interface UseEntityFormOptions<T extends { id: string }> {
    id?: string;
    getStore: () => {
        record: Derived<Record<string, T>>;
        mutate: (id: string, value: T) => void;
    };
    defaultValues: Partial<T>;
}

export function useEntityForm<T extends IdObject>({
                                                      id,
                                                      getStore,
                                                      defaultValues,
                                                  }: UseEntityFormOptions<T>) {
    const { record, mutate } = getStore();

    const derived = useMemo(() => {
        if (!id) return undefined;
        const d = new Derived<T | undefined>({
            fn: () => record.state[id],
            deps: [record],
        });
        d.mount();
        return d;
    }, [id, record]);

    const form = useForm({
        defaultValues: derived?.state ?? {
            ...defaultValues,
            id: id ?? Date.now().toString(),
        } as T,
        onSubmit: async ({ value }) => {
            mutate(value.id, value);
            if (!id) form.reset(); // New item — reset after submit
        },
    });

    useEffect(() => {
        if (derived) {
            return derived.subscribe((d) => {
                if (d.currentVal) {
                    form.reset(d.currentVal);
                }
            });
        }
    }, [derived]);

    return form;
}
