import { Store } from '@tanstack/react-store'
import Fuse, {IFuseOptions} from 'fuse.js';
import { debounce } from "lodash";

type PipelineStep<T> = (data: T[]) => T[];

// Defines the structure of a single search engine instance
type SearchEngine<T> = {
    history: Store<{ term: string; results: T[] }[]>;

    /**
     * Perform a search with the given term. Supports custom pre- and post-search pipelines.
     */
    search: (term: string, preSearchPipeline?: PipelineStep<T>[], postSearchPipeline?: PipelineStep<T>[]) => T[];
};


type SearchEngineRegistry<T> = Record<string, SearchEngine<T>>;

// Create a store for managing search engine instances
export const searchEngineStore = new Store<SearchEngineRegistry<any>>({});

/**
 * Retrieve a global search engine by key.
 * If no key is provided, defaults to "default".
 * @param key The key corresponding to the search engine (default: "default").
 * @returns A SearchEngine instance.
 * @throws If the search engine has not been initialized for the given key.
 */
export function getSearchEngine<T>(key: string = "default"): SearchEngine<T> {
    const registry = searchEngineStore.state;
    const searchEngine = registry[key];
    if (!searchEngine) {
        throw new Error(`Search engine not initialized. Please call createSearchEngine for key "${key}" first.`);
    }
    return searchEngine;
}

export function getSearchEngineStore<T>(key: string = "default"):  Store<SearchEngineRegistry<any>, (cb: SearchEngineRegistry<any>) => SearchEngineRegistry<any>> {
    return searchEngineStore;
}

/**
 * Create and store a search engine globally by key.
 * If no key is provided, defaults to "default".
 * @param key The key to store the search engine under.
 * @param store The data store.
 * @param options Fuse.js configuration options.
 * @param debounceTime Debounce time for the search function (defaults to 300ms).
 * @param globalPreSearchPipeline Global preprocessing steps (optional).
 * @param globalPostSearchPipeline Global postprocessing steps (optional).
 * @returns The created SearchEngine instance.
 */
export function createSearchEngine<T>(
    store: Store<{ data:T[], isHydrated:any }>, // Pass the store as a parameter
    options: IFuseOptions<T> = {},
    debounceTime: number = 300, // Default debounce time
    globalPreSearchPipeline: PipelineStep<T>[] = [],
    globalPostSearchPipeline: PipelineStep<T>[] = [],
    key: string = "default" // Default key for the engine
): SearchEngine<T> {

    const fuseOptions: IFuseOptions<T> = {
        // isCaseSensitive: false,
        // includeScore: false,
        // shouldSort: true,
        // includeMatches: false,
        // findAllMatches: false,
        // minMatchCharLength: 1,
        // location: 0,
        // threshold: 0.6,
        // distance: 100,
        // useExtendedSearch: false,
        // ignoreLocation: false,
        // ignoreFieldNorm: false,
        // fieldNormWeight: 1,
        threshold: 0.6,
        distance: 100,
        ...options, // Merge with provided options

    };

    // Force user to define searchable keys:
    if (!fuseOptions.keys) {
        throw new Error("You must specify at least one key for Fuse.js options.");
    }

    const fuse = new Fuse<T>(Array.from(store.state.data.values()), fuseOptions);

    store.subscribe(() => {
        fuse.setCollection(Array.from(store.state.data.values()));
    });

    // Internal state to store the latest search results
    let latestResults: { term: string; results: T[] } | null = null;

    const history = new Store<{ term: string; results: T[] }[]>([]);

    const searchEngine: SearchEngine<T> =
        {
            history,

            /**
         * Perform a debounced search.
         * @param term The search term entered by the user.
         * @returns Matching movies.
         */
        search: debounce((term: string,
                          preSearchPipeline: PipelineStep<T>[] = [],
                          postSearchPipeline: PipelineStep<T>[] = []) => {
                if (!term.trim()) {
                    // Reset latestResults if the query is empty
                    latestResults = null;
                    return Array.from(store.state.data.values())
                }

                // 1. Pre-search pipeline: Transform or filter data
            const globalPreProcessedData = globalPreSearchPipeline.reduce(
                (data, step) => step(data),
                Array.from(store.state.data.values())
            );

            const preProcessedData = preSearchPipeline.reduce(
                (data, step) => step(data),
                globalPreProcessedData
            );

            // Update Fuse's collection dynamically for this search only
            fuse.setCollection(preProcessedData);

            // 2. Perform the search
            let results = fuse.search(term).map((result) => result.item);

            // 3. Post-search pipeline: Transform or filter final results
            results = postSearchPipeline.reduce((data, step) => step(data), results);
            results = globalPostSearchPipeline.reduce((data, step) => step(data), results);

            history.setState((history)=>[...history, {term, results}]);

            return results;
        }, debounceTime) as (term: string) => T[],
    };

    // Update the store by merging the new search engine into the state
    searchEngineStore.setState((prev) => ({
        ...prev,
        [key]: searchEngine,
    }));

    return searchEngine;
}
