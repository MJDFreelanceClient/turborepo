"use client"

import {useQuery} from "@tanstack/react-query";
import {
    getRequests,
} from "@/app/product-feedback/@api/requests";
import {requestFilter} from "@/app/product-feedback/@api/request-utils";
import {ProductRequest} from "@/app/product-feedback/@api/types";
import {ReactNode, useState} from "react";

const Capitalise = (str:string) => str.charAt(0).toUpperCase() + str.slice(1);

const Column = ({status, groupStatus="planned", data, children}:
                {status:string, groupStatus:string, data:ProductRequest[], children:ReactNode}) => {
    const pipedData = data.filter(requestFilter(status).byStatus);

    return (
        <div data-selected={groupStatus == status} className={`flex flex-col gap-8 w-full max-md:data-[selected=false]:hidden`}>
            <header>
                <h2>{Capitalise(status)} ({pipedData.length})</h2>
                {children}
            </header>

            <ul className={`flex flex-col gap-6`}>
                {pipedData.map((request:ProductRequest) => (
                    <li data-status={request.status} className={`group flex flex-col bg-white`} key={request.id}>
                        <span>{Capitalise(request.status)}</span>
                        <h2>{request.title}</h2>
                        <p>{request.description}</p>
                        <div>{request.category}</div>
                        <div className={`flex justify-between`}>
                            <span>{request.upvotes}</span>
                            <span>{request.comments?.length}</span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

const Page = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["product-feedback"],
        queryFn: getRequests,
    });

    const [groupStatus] = useState<string>('planned');

    if (isLoading || !data) return <div>Loading...</div>;
    if (isError) return <div>Error...</div>;

    return (
        <div className={`flex max-xl:flex-col gap-6 min-w-full xl:min-w-[255px] max-w-[1110px] mx-auto`}>

            <main className={`flex flex-col gap-6 w-full`}>
                <menu className={`flex items-center gap-10 bg-neutral-600 text-white w-full p-6 rounded-[10px]`}>
                    <h2 className={`text-preset-3 mr-auto`}>Roadmap</h2>
                    <a className={`px-6 py-3 rounded-[10px] bg-primary text-preset-4`}>+ Add Feedback</a>
                </menu>

                <section data-status={`planned`} className={`flex gap-6 group`}>
                    <Column groupStatus={groupStatus} status={`planned`} data={data} >
                        <p>Ideas prioritized for research</p>
                    </Column>

                    <Column groupStatus={groupStatus} status={`in-progress`} data={data} >
                        <p>being developed</p>
                    </Column>

                    <Column groupStatus={groupStatus} status={`live`} data={data} >
                        <p>Released features</p>
                    </Column>
                </section>

            </main>
        </div>
    );
};

export default Page;