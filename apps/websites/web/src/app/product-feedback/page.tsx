"use client"

import {useQuery} from "@tanstack/react-query";
import {
    getRequests,
} from "@/app/product-feedback/@api/requests";
import {useCallback, useMemo, useState} from "react";
import {getCategories, getStatuses, requestFilter, requestSort} from "@/app/product-feedback/@api/request-utils";
import {uniqueArray} from "@/lib/utils/data/arrays";
import {Select, SelectContent, SelectItem, SelectTrigger} from "@/components/input/Select";
import {upvote, upvotesStore} from "@/app/product-feedback/@api/upvotesStore";
import {useStore} from "@tanstack/react-store";
import {ProductRequest} from "@/app/product-feedback/@api/types";

const Capitalise = (str:string) => str.charAt(0).toUpperCase() + str.slice(1);

const Page = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["product-feedback"],
        queryFn: getRequests,
    });

    const [category, setCategory] = useState<string | undefined>();
    const [sortFacet, setSortFacet] = useState<keyof typeof requestSort | undefined>("byMostUpvotes");

    const pipedData = useMemo(()=>{
        const pipeline = data?.filter(requestFilter(category).byCategory);
        if (sortFacet) return pipeline?.sort(requestSort[sortFacet].fn);
        return pipeline;

    }, [category, sortFacet, data]);

    const upvotes = useStore(upvotesStore);

    const getUpvotes = useCallback((request:ProductRequest) => {
        let initUpvotes = request.upvotes;
        if (upvotes.find(upvote=> upvote === request.id)) {
            initUpvotes++;
        }
        return initUpvotes;
    }, [upvotes])

    if (isLoading || !data) return <div>Loading...</div>;
    if (isError) return <div>Error...</div>;

    return (
        <div className={`flex max-xl:flex-col gap-6 min-w-full xl:min-w-[255px] max-w-[1110px] mx-auto `}>
            <menu className={`flex xl:flex-col gap-6 xl:max-w-[300px] xl:w-full relative`}>
                <header className={`bg-purple-500 text-white flex flex-col justify-end xl:min-h-[137px] p-6 rounded-[10px] max-xl:flex-1`}>
                    <h1 className={`text-preset-1`}>Frontend Mentor</h1>
                    <p className={`opacity-75 text-preset-2`}>Feedback Board</p>
                </header>

                <div className={`flex max-md:flex-col xl:flex-col gap-6 xl:max-w-[300px] xl:w-full max-xl:flex-2 max-md:absolute inset-0 max-md:bg-neutral-300 `}>
                    <div className={`flex flex-wrap gap-4 bg-white xl:w-full p-6 rounded-[10px] max-xl:flex-1`}>
                        <button data-selected={!category}
                                className={`px-4 py-1 h-fit bg-neutral-200 rounded-[10px] cursor-pointer text-secondary data-[selected=true]:bg-secondary data-[selected=true]:text-white`}
                                onClick={()=>setCategory(()=>undefined)} >
                            All</button>
                        {uniqueArray(getCategories(data)).map((currentCategory) =>(
                            <button data-selected={category === currentCategory}
                                    className={`px-4 py-1 bg-neutral-200 rounded-[10px] h-fit cursor-pointer text-secondary text-preset-4 data-[selected=true]:bg-secondary data-[selected=true]:text-white`}
                                    onClick={()=>setCategory(()=>currentCategory)} key={currentCategory}>
                                {Capitalise(currentCategory)}</button>
                        ))}
                    </div>

                    <section className={`bg-white xl:w-full px-6 py-5 flex flex-col gap-6 rounded-[10px] max-xl:flex-1`}>
                        <header className={`flex justify-between items-center`}>
                            <h2 className={`text-preset-3 text-neutral-700`}>Roadmap</h2>
                            <a href={`/product-feedback/roadmap`} className={`underline text-secondary text-preset-4`}>View</a>
                        </header>
                        <dl className={`flex flex-col gap-2`}>
                            {uniqueArray(getStatuses(data)).map((status)=>(
                                <div key={status} data-status={status} className={`flex justify-between group`}>
                                    <dt className={`text-preset-5 text-neutral-400 flex gap-4 items-center
                                    before:w-2 before:h-2 before:rounded-full before:aspect-square before:bg-gray-300
                                    group-data-[status=planned]:before:bg-orange-500
                                    group-data-[status='in-progress']:before:bg-purple-500
                                    group-data-[status=live]:before:bg-cyan-500`}>
                                        {Capitalise(status).replace('-', ' ')}</dt>
                                    <dd className={`text-preset-5 font-bold text-neutral-400`}>{data.filter(requestFilter(status).byStatus).length}</dd>
                                </div>
                            ))}
                        </dl>
                    </section>
                </div>
            </menu>

            <main className={`flex flex-col gap-6 w-full`}>
                <menu className={`flex items-center gap-10 bg-neutral-600 text-white w-full p-6 rounded-[10px]`}>
                    <h2 className={`text-preset-3`}>{pipedData?.length??0} Suggestions</h2>
                    <div className={`flex gap-4 items-center mr-auto text-preset-4 
                    `}><span className={`text-nowrap font-normal`}>Sort by:</span>
                        <Select value={sortFacet} onValueChange={setSortFacet as any}>
                            <SelectTrigger className={`border-0 gap-2`}>{sortFacet?requestSort?.[sortFacet]?.displayName??"Select":"Select"}</SelectTrigger>
                            <SelectContent>
                                {Object.keys(requestSort).map((key)=>
                                    <SelectItem key={key} value={key}>{requestSort[key as keyof typeof requestSort].displayName}</SelectItem>
                                )}
                            </SelectContent>
                        </Select>
                    </div>
                    <a className={`px-6 py-3 rounded-[10px] bg-primary text-preset-4`}>+ Add Feedback</a>
                </menu>

                <ul className={`flex flex-col gap-6`}>
                    {pipedData?.map((request, index) => (
                        <li key={index}>
                            <a className={`grid grid-cols-[auto_1fr_auto] gap-x-10 text-neutral-700 gap-2
                                    grid-areas-[upvotes_title_comments|upvotes_desc_comments|upvotes_cat_comments] bg-white py-7 px-8 rounded-[10px]`}>
                                <div className={`items-center grid-area-[upvotes] text-preset-4 font-bold px-2 py-3 bg-neutral-200 rounded-[10px] h-fit flex flex-col gap-2 font-bold`}>
                                    <button onClick={()=>upvote(request.id)}>up</button>
                                    {getUpvotes(request)}</div>
                                <h2 className={`grid-area-[title] text-preset-3`}>{request.title}</h2>
                                <div className={`grid-area-[desc] text-neutral-400`}>{request.description}</div>
                                <div className={`grid-area-[cat] mt-1`}>
                                    <button data-selected={category === request.category}
                                            className={`px-4 py-1 bg-neutral-200 rounded-[10px] cursor-pointer text-secondary text-preset-4`}
                                            onClick={()=>setCategory(()=>request.category)} key={request.category}>
                                        {Capitalise(request.category)}</button>
                                </div>
                                <div className={`grid-area-[comments] self-center font-bold`}>{request.comments?.length??0}</div>
                            </a>
                        </li>
                    ))}
                </ul>
            </main>
        </div>
    );
};

export default Page;