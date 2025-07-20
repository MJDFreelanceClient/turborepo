import {ReactNode} from "react";
import {dehydrate, QueryClient} from "@tanstack/react-query";
import {getCountries} from "@/app/rest-flags/@data/api";
import HydrateWrapper from "@/app/personal-finance/components/HydrateWrapper";
import colors from "@/app/rest-flags/styles/colors.module.css";
import text from "@/app/rest-flags/styles/text.module.css";
import {DarkMode} from "@/app/rest-flags/components/DarkMode";

const defaultQueryClientConfig = {
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

const Layout = async ({children}:{children:ReactNode}) => {
    const queryClient = new QueryClient(defaultQueryClientConfig);

    await queryClient.prefetchQuery({
        queryKey: ['countries'],
        queryFn: () => getCountries(),
    });

    const dehydratedState = dehydrate(queryClient);

    return (
        <HydrateWrapper dehydratedState={dehydratedState}>
            <div className={`${text.setup} ${colors.setup} min-h-screen flex flex-col`}>
                <header className={`px-4 md:px-10 xl:px-20 py-6 flex items-center justify-between dark:bg-blue-800`}>
                    <h1 className={`xl:text-preset-2 text-gray-900 dark:text-white text-mobile-2`}>Where in the world?</h1>
                    <DarkMode />
                </header>
                <main className={`px-4 md:px-10 xl:px-20 py-12 bg-gray-50 flex flex-col gap-12 flex-1 dark:bg-blue-900`}>
                    {children}
                </main>
            </div>
        </HydrateWrapper>
    );
};

export default Layout;