"use client"

import {upvote, upvotesStore} from "@/app/product-feedback/@api/upvotesStore";
import {useQuery} from "@tanstack/react-query";
import {getRequest} from "@/app/product-feedback/@api/requests";
import {useCallback, useState} from "react";
import {useStore} from "@tanstack/react-store";
import {ProductRequest} from "@/app/product-feedback/@api/types";
import {useParams, useRouter} from "next/navigation";
import {Comment} from "@/app/product-feedback/@api/types";

const Capitalise = (str:string) => str.charAt(0).toUpperCase() + str.slice(1);

const CommentView = ({comment}: {comment:Comment}) => {
    const isReply = !!comment.replyingTo;

    return (
        <>
            <div>
                <header>
                    <h2>{comment.user.name}</h2>
                    <span>{comment.user.username}</span>
                </header>
                <p>{isReply&&comment.replyingTo} {comment.content}</p>
                <div className={`flex flex-col gap-2 mt-2 ${!isReply && `ml-8`}`}>
                    {comment.replies?.map((reply, index) => (
                        <CommentView key={index} comment={reply} />
                    ))}
                </div>
            </div>
        </>
    )
}

const Page = () => {
    const router = useRouter();
    const params = useParams();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["product-feedback-single"],
        queryFn: ()=>getRequest(params.id!.toString()),
    });

    const [category, setCategory] = useState<string | undefined>();

    const upvotes = useStore(upvotesStore);

    const getUpvotes = useCallback((request:ProductRequest) => {
        let initUpvotes = request.upvotes;
        if (upvotes.find(upvote=> upvote === request.id)) {
            initUpvotes++;
        }
        return initUpvotes;
    }, [upvotes])

    if (isLoading || !data) return <div>Loading...</div>;

    const request = data as any as ProductRequest;

    return (
        <div className={`flex flex-col gap-10`}>
            <section className={`grid grid-cols-[auto_1fr_auto] gap-x-10 text-neutral-700 gap-2
                                    grid-areas-[upvotes_title_comments|upvotes_desc_comments|upvotes_cat_comments] bg-white py-7 px-8 rounded-[10px]`}>
                <div className={`items-center grid-area-[upvotes] text-preset-4 font-bold px-2 py-3 bg-neutral-200 rounded-[10px] h-fit flex flex-col gap-2 font-bold`}>
                    <button onClick={()=>upvote(request.id!)}>up</button>
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
            </section>

            <section className={`p-6 bg-white rounded-[10px]`}>
                <h1>{request.comments?.length} Comments</h1>

                <section className={`flex flex-col gap-6`}>
                    {request.comments?.map((comment, index) => (
                        <>
                            {index !== 0 && <hr />}
                            <CommentView key={index} comment={comment} />
                        </>
                    ))}
                </section>
            </section>
        </div>
    );
};

export default Page;