"use client"

import { useForm } from '@tanstack/react-form'
import { ProductRequestSchema, emptyProductRequest } from '@/app/product-feedback/@api/types'
import {Select, SelectContent, SelectItem, SelectTrigger} from "@/components/input/Select";

const Page = () => {

    const form = useForm({
        defaultValues: emptyProductRequest,
        validators: {
            onChange: ProductRequestSchema as any,
            onSubmit: ProductRequestSchema as any,  // optional but recommended
        },
        onSubmit: async ({ value }) => {
            console.log('Submitting product request:', {...value, status:'suggestion'})
            // send to API or state manager
        },
    })

    return (
        <main className={`max-w-[540px] mx-auto flex flex-col gap-[88px] items-start`}>
            <button>Go Back</button>

            <form onSubmit={e=>{
                form.handleSubmit(e);
                e.preventDefault();
            }} className={`bg-white px-10 py-20 flex flex-col gap-6 w-full relative rounded-[10px]`}>
                <h1 className={`text-preset-2 text-[24px] text-neutral-700`}>Create New Feedback</h1>

                <div className={`absolute top-0 bg-black h-14 w-14 rounded-full -translate-y-[50%]`}></div>

                <form.Field name={`title`} >
                    {field=>(
                        <div className={`flex flex-col gap-4`}>
                            <label htmlFor={`title`} className={`flex flex-col gap-0.5 text-preset-6`}>
                                <div className={`tracking-[-.194px] text-neutral-700`}>Feedback Title</div>
                                <div className={`text-neutral-400`}>Add a short, descriptive headline</div>
                            </label>
                            <input className={`border py-3 px-6 text-preset-2`} value={field.state.value} onChange={e=>field.handleChange(e.target.value)} />
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
                            <Select value={field.state.value} onValueChange={field.handleChange} >
                                <SelectTrigger className={`!bg-neutral-300 !text-preset-2 !rounded-[0] !py-3 px-6`}>{field.state.value && field.state.value.length > 0 ? field.state.value :'Select Category'}</SelectTrigger>
                                <SelectContent className={`bg-neutral-300`}>
                                    <SelectItem value={`feature`} >Feature</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    )}
                </form.Field>

                <form.Field name={`description`} >
                    {field=>(
                        <div className={`flex flex-col gap-4`}>
                            <label htmlFor={`title`} className={`flex flex-col gap-0.5 text-preset-6`}>
                                <div className={`tracking-[-.194px] text-neutral-700`}>Feedback Detail</div>
                                <div className={`text-neutral-400`}>Include any specific comments on what should be improved, added, etc.</div>
                            </label>
                            <textarea className={`border py-3 px-6 text-preset-2`} value={field.state.value} onChange={e=>field.handleChange(e.target.value)} />
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