"use client"

import {useForm} from "@tanstack/react-form";

export const ContactForm = () => {
    const form = useForm({
        defaultValues: {
            email:''
        },
        onSubmit: ({value}) => {
            console.log(value);
        }
    });

    return (
        <div className={`flex flex-col gap-4 items-center bg-blue-600 text-white w-full p-18`}>
            <form onSubmit={e=>{
                e.preventDefault();
                form.handleSubmit(e);
            }} className={`flex flex-col gap-4 items-center bg-blue-600 text-white w-fit`}>
                <header className={`flex flex-col items-center text-center mb-6`}>
                    <span>35,000+ ALREADY JOINED</span>
                    <h2 className={`text-preset-1`}>Stay up-to-date with what we’re doing</h2>
                </header>
                <form.Field name={`email`}>
                    {field=>(
                        <div className={`w-full`}>
                            <label className={`sr-only`}>Enter your email address</label>
                            <input placeholder={`Enter your email address z-1`} className={`bg-white px-6 py-2.5 flex items-center w-full rounded-[5px] text-black`}
                                   value={field.state.value} onChange={e=>field.handleChange(e.target.value)} />
                            <div className={`bg-red-400 text-white p-4 -translate-y-1 z-0 ${field.state.errors}`}>{field.state.errors}</div>
                        </div>
                    )}
                </form.Field>
                <button className={`bg-red-400 text-white py-2 rounded-5px w-full rounded-[5px]`}>Contact Us</button>
            </form>
        </div>
    );
};