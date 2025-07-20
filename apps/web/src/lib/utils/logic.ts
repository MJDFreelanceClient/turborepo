import { Derived, Store } from "@tanstack/react-store";
import {PathToString} from "@/app/kanban/hooks/useBoard";

export const isSet = (val: any, allowEmptyString = true): boolean =>
    !!val?.toString() && (allowEmptyString || val?.toString() !== "");

const getValueByPath = (obj: any, path: string): any => {
    return path.split('.').reduce((acc, key) => acc?.[key], obj)
}

// Utility to convert *any* object array to record
export const arrayToRecord = <
    T extends object,
    K extends T extends { id: string } ? ( PathToString<T> | undefined) :  PathToString<T>
>(
    array: T[],
    key: K
) => {
    const useKey = (key ?? "id") as keyof T & string;
    return array.reduce((acc, item) => {
        const keyValue = getValueByPath(item, useKey)
        if (keyValue != null) acc[keyValue as string] = item;
        return acc;
    }, {} as Record<string, T>);
}

