import {ReactNode} from "react";
import HydrateWrapper from "@/app/personal-finance/components/HydrateWrapper";
import {dehydrate, QueryClient} from "@tanstack/react-query";
import {defaultQueryClientConfig} from "@/lib/configs";
import colors from "@/app/product-feedback/@styles/colors.module.css";
import text from "@/app/product-feedback/@styles/text.module.css";
import {getRequests} from "@/app/product-feedback/@api/requests";

const Layout = async ({children}:{children:ReactNode}) => {
    const queryClient = new QueryClient(defaultQueryClientConfig);

    await queryClient.prefetchQuery({
        queryKey: ['product-feedback'],
        queryFn: () => getRequests(),
    });

    const dehydratedState = dehydrate(queryClient);

    return (
        <HydrateWrapper dehydratedState={dehydratedState} >
            <div className={`min-h-screen bg-background ${text.setup} ${colors.setup}`}>
                {children}
            </div>
        </HydrateWrapper>
    );
};

export default Layout