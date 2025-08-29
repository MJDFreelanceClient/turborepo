'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HydrationBoundary } from '@tanstack/react-query';
import {ReactNode, useState} from 'react';
import type { DehydratedState } from '@tanstack/react-query';

const defaultQueryClientConfig = {
    defaultOptions: {
        queries: {
            staleTime: 1000000, // 10 seconds
            refetchOnWindowFocus: false, // optional, tune to taste
        },
        mutations: {
            // Optional global mutation defaults
        }
    }
};

export default function HydrateWrapper({
                                       dehydratedState,
                                        children
                                   }: {
    dehydratedState: DehydratedState;
    children: ReactNode;
}) {
    const [queryClient] = useState(() => new QueryClient(defaultQueryClientConfig));

    return (
        <QueryClientProvider client={queryClient}>
            <HydrationBoundary state={dehydratedState}>
                {children}
            </HydrationBoundary>
        </QueryClientProvider>
    );
}