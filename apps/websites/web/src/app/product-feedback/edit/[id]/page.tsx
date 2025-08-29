"use client"

import { useForm } from '@tanstack/react-form'
import {ProductRequest, ProductRequestSchema} from '@/app/product-feedback/@api/types'
import {Select, SelectContent, SelectItem, SelectTrigger} from "@/components/input/Select";
import {useQuery} from "@tanstack/react-query";
import {getRequest} from "@/app/product-feedback/@api/requests";
import colors from "@/app/product-feedback/@styles/colors.module.css";
import text from "@/app/product-feedback/@styles/text.module.css";
import {useRouter, useParams} from "next/navigation";

const Capitalise =
    (str?:string) => str?str.charAt(0).toUpperCase() + str.slice(1):undefined;

const Page = () => {
    const router = useRouter();
    const params = useParams();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["product-feedback-single"],
        queryFn: ()=>getRequest(params.id!.toString()),
    });

    const form = useForm({
        defaultValues: {
            title:(data as ProductRequest)?.title??'',
            status:(data as ProductRequest)?.status??'',
            description:(data as ProductRequest)?.description??'',
            category:(data as ProductRequest)?.category??'',
        },
        validators: {
            onChange: ProductRequestSchema as any,
            onSubmit: ProductRequestSchema as any,  // optional but recommended
        },
        onSubmit: async ({ value }) => {
            console.log('Submitting product request:', value)
            // send to API or state manager
        },
    })


    if (isLoading) return <div>Loading...</div>;
    if ((data as {unset:boolean}).unset) return router.push("/product-feedback/add");

    return (
        <main className={`max-w-[540px] mx-auto flex flex-col gap-[88px] items-start`}>
            <button>Go Back</button>

            <form onSubmit={e=>{
                form.handleSubmit(e);
                e.preventDefault();
            }} className={`bg-white px-10 py-20 flex flex-col gap-6 w-full relative rounded-[10px]`}>
                <h1 className={`text-preset-2 text-[24px] text-neutral-700`}>Editing ‘{(data as ProductRequest)?.title}’</h1>

                <div className={`absolute top-0 bg-black h-14 w-14 rounded-full -translate-y-[50%]`}></div>

                <form.Field name={`title`} >
                    {field=>(
                        <div className={`flex flex-col gap-4`}>
                            <label htmlFor={`title`} className={`flex flex-col gap-0.5 text-preset-6`}>
                                <div className={`tracking-[-.194px] text-neutral-700`}>Feedback Title</div>
                                <div className={`text-neutral-400`}>Add a short, descriptive headline</div>
                            </label>
                            <input className={`border py-3 px-6 text-preset-2`} value={field.state.value}
                                   onChange={e=>field.handleChange(e.target.value)} />
                        </div>
                    )}
                </form.Field>

                <form.Field name={`category`} >
                    {field=>(
                        <div className={`flex flex-col gap-4`}>
                            <label htmlFor={`title`} className={`flex flex-col gap-0.5 text-preset-6`}>
                                <div className={`tracking-[-.194px] text-neutral-700`}>Category</div>
                                <div className={`text-neutral-400`}>Choose a category for your feedback</div>
                            </label>
                            {field.state.value && field.state.value.length > 1 && <Select value={field.state.value} onValueChange={field.handleChange}>
                                <SelectTrigger className={`!bg-neutral-300 !text-preset-2 !rounded-[0] !py-3 px-6`}>
                                    {field.state.value?.length>0 ? Capitalise(field.state.value):'Select Category'}</SelectTrigger>
                                <SelectContent className={`bg-neutral-300 ${text.setup} ${colors.setup}`}>
                                    <SelectItem value={`feature`}>Feature</SelectItem>
                                    <SelectItem value={`bug`}>Bug</SelectItem>
                                    <SelectItem value={`enhancement`}>Enhancement</SelectItem>
                                </SelectContent>
                            </Select>}
                        </div>
                    )}
                </form.Field>

                <form.Field name={`status`} >
                    {field=>(
                        <div className={`flex flex-col gap-4`}>
                            <label htmlFor={`title`} className={`flex flex-col gap-0.5 text-preset-6`}>
                                <div className={`tracking-[-.194px] text-neutral-700`}>Update Status</div>
                                <div className={`text-neutral-400`}>Change feedback state</div>
                            </label>
                            {field.state.value && field.state.value.length > 1 && <Select value={field.state.value} onValueChange={field.handleChange} >
                                <SelectTrigger className={`!bg-neutral-300 !text-preset-2 !rounded-[0] !py-3 px-6`}>
                                    {field.state.value?.length>0 ? Capitalise(field.state.value):'Select Status'}</SelectTrigger>
                                <SelectContent className={`bg-neutral-300 ${text.setup} ${colors.setup}`}>
                                    <SelectItem value={`live`} >Live</SelectItem>
                                    <SelectItem value={`in-progress`} >In Progress</SelectItem>
                                    <SelectItem value={`suggestion`} >Suggestion</SelectItem>
                                    <SelectItem value={`planned`} >Planned</SelectItem>
                                </SelectContent>
                            </Select>}
                        </div>
                    )}
                </form.Field>


                <form.Field name={`description`} >
                    {field=>(
                        <div className={`flex flex-col gap-4`}>
                            <label htmlFor={`title`} className={`flex flex-col gap-0.5 text-preset-6`}>
                                <div className={`tracking-[-.194px] text-neutral-700`}>Feedback Detail</div>
                                <div className={`text-neutral-400`}>
                                    Include any specific comments on what should be improved, added, etc.</div>
                            </label>
                            <textarea className={`border py-3 px-6 text-preset-2`} value={field.state.value}
                                      onChange={e=>field.handleChange(e.target.value)} />
                        </div>
                    )}
                </form.Field>

                <div className={`mt-2 flex justify-end gap-4`}>
                    <button className={`px-6 py-3 rounded-[10px] text-preset-4 text-white bg-neutral-700`}>Cancel</button>
                    <button className={`px-6 py-3 rounded-[10px] bg-primary text-preset-4 text-white`}>Add Feedback</button>
                </div>
            </form>
        </main>
    );
};


export default Page;