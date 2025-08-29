import Fuse from "fuse.js";

type Operation<T> = (data: T[]) => T[];

type PipelineConfig<T> = {
    filters?: Record<string, (item: T) => boolean>;
    sortBy?: Record<string, (a: T, b: T) => number>;
    pageSize?: number;
    searchOptions?: Fuse.IFuseOptions<T>;
}

export function makePipeline<T>(data: T[], config?: PipelineConfig<T>) {
    const steps: Operation<T>[] = [];

    const pipeline = {
        filterBy: (param: string | ((item: T) => boolean)) => {
            const fn = typeof param === "function"
                ? param
                : config?.filters?.[param];

            if (fn) {
                steps.push(data => data.filter(fn));
            }

            return pipeline;
        },

        sortBy: (param: string | ((a: T, b: T) => number)) => {
            const fn = typeof param === "function"
                ? param
                : config?.sortBy?.[param];

            if (fn) {
                steps.push(data => [...data].sort(fn));
            }

            return pipeline;
        },

        limit: (count: number) => {
            steps.push(data => data.slice(0, count));
            return pipeline;
        },

        goToPage: (pageNo: number) => {
            const pageSize = config?.pageSize ?? 10;
            steps.push(data =>
                data.slice((pageNo - 1) * pageSize, pageNo * pageSize)
            );
            return pipeline;
        },

        search: (query: string) => {
            if (config?.searchOptions) {
                steps.push(data => {
                    const fuse = new Fuse(data, config.searchOptions);
                    return fuse.search(query).map(r => r.item);
                });
            }
            return pipeline;
        },

        evaluate: () => {
            return steps.reduce((result, op) => op(result), data);
        },

        reset: () => makePipeline(data, config), // Fresh pipeline
    };

    return pipeline;
}
