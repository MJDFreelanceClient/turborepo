import {ReactNode} from "react";
import {Menu} from "@/app/invoices/@components/Menu";
import colors from "@/app/invoices/@styles/colors.module.css";
import text from "@/app/invoices/@styles/text.module.css";
import HydrateWrapper from "@/app/personal-finance/components/HydrateWrapper";
import {dehydrate, QueryClient} from "@tanstack/react-query";
import {getInvoices} from "@/app/invoices/@api/invoices";

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
        queryKey: ['invoices'],
        queryFn: () => getInvoices(),
    });

    const dehydratedState = dehydrate(queryClient);

    return (
        <HydrateWrapper dehydratedState={dehydratedState}>
            <div className={`grid xl:grid-cols-[auto_1fr_auto] min-h-screen bg-neutral-100 justify-items-center dark:bg-purple-900 ${colors.setup} ${text.setup}`}>
                <Menu />
                {children}
            </div>
        </HydrateWrapper>
    );
};

export default Layout;
