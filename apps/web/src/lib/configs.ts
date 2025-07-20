export const defaultQueryClientConfig = {
    defaultOptions: {
        queries: {
            staleTime: 10000, // 10 seconds
            refetchOnWindowFocus: false, // optional, tune to taste
        },
        mutations: {
            // Optional global mutation defaults
        }
    }
};