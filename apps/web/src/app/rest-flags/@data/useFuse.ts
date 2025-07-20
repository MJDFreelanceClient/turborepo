import Fuse, { IFuseOptions } from "fuse.js";
import {useRef, useState, useMemo, useCallback} from "react";

type UseFuseParams<T> = {
    data: T[];
    keys: string[];
    overrides?: Partial<IFuseOptions<T>>;
};

export const useFuse = <T>({ data, keys, overrides = {} }: UseFuseParams<T>) => {
    const fuseRef = useRef(new Fuse(data, { threshold: 0.3, keys, ...overrides }));

    const [query, setQuery] = useState('');
    const [currentData, setCurrentData] = useState(data);

    const updateData = useCallback((newData: T[]) => {
        fuseRef.current.setCollection(newData);
        setCurrentData(newData);
    }, []);

    const search = useCallback((pattern: string) => {
        setQuery(pattern);
    }, []);

    const results = useMemo(() => {
        if (!query.trim()) {
            return currentData.map(item => ({ item }));
        }
        return fuseRef.current.search(query);
    }, [query, currentData]);

    return {
        updateData,
        search,
        results,
        query,
    };
};
