import { Store } from "@tanstack/react-store";

export const cartStore = new Store<Record<string, { quantity: number; product: any }>>({});

export const addQuantity = (id: string, quantity: number, product: any) => {
    cartStore.setState((value) => {
        const current = value[id];
        const newQuantity = (current?.quantity || 0) + quantity;

        // If quantity is zero or less, remove the item from the store
        if (newQuantity <= 0) {
            const { [id]: _, ...rest } = value; // Destructure to exclude the item
            return rest;
        }

        // Otherwise, update or add the item
        return {
            ...value,
            [id]: {
                quantity: newQuantity,
                product: current?.product || product,
            },
        };
    });
};
