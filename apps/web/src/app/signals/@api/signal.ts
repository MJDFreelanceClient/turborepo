// signal.js
// signal.ts
export function createSignal<T>(initialValue: T) {
    let value = initialValue;
    const subscribers = new Set<() => void>();

    function signal(newValue?: T): T {
        if (arguments.length === 0) {
            return value;
        } else {
            value = newValue!;
            subscribers.forEach((fn) => fn());
            return value;
        }
    }

    signal.subscribe = (fn: () => void) => {
        subscribers.add(fn);
        return () => subscribers.delete(fn);
    };

    return signal;
}


// Basic effect system to track dependencies
let currentEffect:any = null;
export function createEffect(fn:any) {
    currentEffect = fn;
    fn(); // run once to collect dependencies
    currentEffect = null;
}