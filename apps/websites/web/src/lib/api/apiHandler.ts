interface ApiHandlerOptions {
    // Rate limiting
    requestsPerSecond?: number;
    // Retry options
    maxRetries?: number;
    retryDelay?: number;
    // Timeout options
    timeout?: number;
    // Custom error handling
    shouldRetry?: (error: Error, attemptCount: number) => boolean;
    // Optional abort signal
    signal?: AbortSignal;
}

interface ApiHandlerResult {
    callApi: (initialUri: string) => Promise<void>;
    abort: () => void;
}

export const createApiHandler = (
    calculateNextUrl: (data: any, uri: string) => string | null | undefined,
    processData: (data: any) => void,
    options: ApiHandlerOptions = {}
): ApiHandlerResult => {
    const {
        requestsPerSecond = 2,
        maxRetries = 3,
        retryDelay = 1000,
        timeout = 30000,
        shouldRetry = (error) => error.message.includes('429') || error.message.includes('503'),
    } = options;

    const controller = new AbortController();
    const signal = options.signal ?? controller.signal;

    // Rate limiting using token bucket algorithm
    let tokens = requestsPerSecond;
    let lastRefill = Date.now();

    const refillTokens = () => {
        const now = Date.now();
        const timePassed = now - lastRefill;
        const refillAmount = (timePassed / 1000) * requestsPerSecond;
        tokens = Math.min(requestsPerSecond, tokens + refillAmount);
        lastRefill = now;
    };

    const consumeToken = async () => {
        refillTokens();
        if (tokens < 1) {
            const waitTime = (1000 / requestsPerSecond) * (1 - tokens);
            await new Promise(resolve => setTimeout(resolve, waitTime));
            refillTokens();
        }
        tokens -= 1;
    };

    const fetchWithRetry = async (uri: string, attempt = 1): Promise<any> => {
        try {
            await consumeToken();

            const abortTimeout = setTimeout(() => controller.abort(), timeout);

            const response = await fetch(uri, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                signal
            });

            clearTimeout(abortTimeout);

            return await response.json();
        } catch (error: any) {
            if (signal.aborted) {
                throw new Error('Request aborted');
            }

            if (attempt < maxRetries && shouldRetry(error, attempt)) {
                const delay = retryDelay * Math.pow(2, attempt - 1); // Exponential backoff
                await new Promise(resolve => setTimeout(resolve, delay));
                return fetchWithRetry(uri, attempt + 1);
            }

            throw error;
        }
    };

    const callApi = async (initialUri: string) => {
        let currentUri: string | null | undefined = initialUri;

        while (currentUri && !signal.aborted) {
            try {
                const data = await fetchWithRetry(currentUri);
                processData(data);
                currentUri = calculateNextUrl(data, currentUri);
            } catch (error) {
                console.error('Error in API call:', error);
                throw error;
            }
        }
    };

    return {
        callApi,
        abort: () => controller.abort()
    };
};