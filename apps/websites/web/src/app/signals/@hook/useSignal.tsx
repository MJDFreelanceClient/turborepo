// useSignal.ts
import { useSyncExternalStore } from "react";

export function useSignal<T>(signal: {
    (): T;
    subscribe: (fn: () => void) => () => void;
}): T {
    return useSyncExternalStore(signal.subscribe, signal);
}