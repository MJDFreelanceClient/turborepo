import { dehydrate, QueryClient } from '@tanstack/react-query';
import {getBudgets, getPots, getTransactions} from "@/lib/dynamo";
import HydrateWrapper from "@/app/personal-finance/components/HydrateWrapper";
import colors from "@/app/personal-finance/styles/colors.module.css";
import text from "@/app/personal-finance/styles/text.module.css";
import {ReactNode} from "react";

const Layout = async ({children}:{children:ReactNode}) => {

    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 10000, // 10 seconds
                refetchOnWindowFocus: false, // optional, tune to taste
            },
            mutations: {
                // Optional global mutation defaults
            }
        }
    });

    await queryClient.prefetchQuery({
        queryKey: ['pots'],
        queryFn: ()=>getPots(),
    });

    await queryClient.prefetchQuery({
        queryKey: ['budgets'],
        queryFn: ()=>getBudgets(),
    });

    await queryClient.prefetchQuery({
        queryKey: ['transactions'],
        queryFn: ()=>getTransactions(),
    });

    const dehydratedState = dehydrate(queryClient);

    return (
        <HydrateWrapper dehydratedState={dehydratedState}>
            <div className={`min-h-screen bg-beige-100 ${colors.setup} ${text.setup}`}>
                {children}
            </div>
        </HydrateWrapper>
    );
};

export default Layout;