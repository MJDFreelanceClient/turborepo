import { useEffect, useState } from "react";
import { Store } from "@tanstack/react-store";
import {getSearchEngineStore} from "@/lib/search/engine";

export function useSearchResults<T>(
    engineKey: string, initialValues: T[]
): {results: T[] | undefined } {
    const [results, setResults] = useState<{ term: string; results: T[] } | null>(null);
    const searchEngineStore = getSearchEngineStore(); // Retrieve the global search engine store

    useEffect(() => {
        const subscribeToHistory = (historyStore: Store<{ term: string; results: T[] }[]>) => {
            return historyStore.subscribe((history) => {
                const latestEntry = history.currentVal[history.currentVal.length - 1];
                if (latestEntry) {
                    setResults(latestEntry);
                }
            });
        };

        // Subscribe to the searchEngineStore to get the engine by the key
        const unsubscribeFromRegistry = searchEngineStore.subscribe((registry) => {
            const searchEngine = registry.currentVal[engineKey];
            if (searchEngine) {
                // When the engine is found, subscribe to its history
                return subscribeToHistory(searchEngine.history);
            }
        });

        // If the engine already exists in the store, subscribe immediately
        const existingEngine = searchEngineStore.state[engineKey];
        if (existingEngine) {
            const unsubscribeFromHistory = subscribeToHistory(existingEngine.history);
            return () => {
                unsubscribeFromRegistry();
                unsubscribeFromHistory();
            };
        }

        return () => {
            unsubscribeFromRegistry();
        };
    }, [searchEngineStore, engineKey]);

    return { results:results?.results??initialValues };
}