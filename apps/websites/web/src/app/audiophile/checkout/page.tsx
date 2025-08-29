"use client"

import {useForm} from "@tanstack/react-form";
import {RadioGroup} from "@/components/input/RadioGroup";
import {RadioGroupItem} from "@/components/input/RadioGroup";
import { z } from 'zod';

const Page = () => {
    const checkoutSchema = z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Invalid email"),
        phoneNumber: z.string().min(10, "Phone number is required"),
        address: z.string().min(1, "Address is required"),
        zip: z.string().min(1, "ZIP code is required"),
        city: z.string().min(1, "City is required"),
        country: z.string().min(1, "Country is required"),
        paymentType: z.enum(['e-Money', 'cod']),
        eMoneyNumber: z.string().optional(), // conditionally required later
        eMoneyPin: z.string().optional()
    }).superRefine((data, ctx) => {
        if (data.paymentType === 'e-Money') {
            if (!data.eMoneyNumber) {
                ctx.addIssue({
                    path: ['eMoneyNumber'],
                    code: z.ZodIssueCode.custom,
                    message: 'e-Money number is required',
                });
            }
            if (!data.eMoneyPin) {
                ctx.addIssue({
                    path: ['eMoneyPin'],
                    code: z.ZodIssueCode.custom,
                    message: 'e-Money PIN is required',
                });
            }
        }
    });

    const form = useForm({
        defaultValues: {
            name: '',
            email: '',
            phoneNumber: '',
            address: '',
            zip: '',
            city: '',
            country: '',
            paymentType: 'e-Money',
            eMoneyNumber: undefined,
            eMoneyPin: ''
        },
        validators: {
            onChange: checkoutSchema as any,
            onSubmit: checkoutSchema as any,  // optional but recommended
        },
    })

    return (
        <main className={`p-6 bg-neutral-300 flex-1  `}>
            <div className={`grid md:grid-cols-[1fr_auto] max-w-desktop-page xl:mx-auto w-full`}>
                <form className={`flex flex-col gap-8 bg-white p-6 `}>
                    <h1 className={`text-preset-4 text-[1.75rem] xl:text-preset-8`}>CHECKOUT</h1>
                    <fieldset className={`grid md:grid-cols-2 gap-6`}>
                        <h2 className={`col-span-all text-preset-5 text-primary`}>BILLING DETAILS</h2>
                        <form.Field name={`name`}>
                            {field=>(
                                <div className={`flex flex-col gap-2`}>
                                    <div className={`flex justify-between items-center`}>
                                        <label className={`text-preset-4`}>Name</label>
                                        {field.state.meta.errors?.[0] && (
                                            <span className="text-red-500 text-preset-4">
                                            {field.state.meta.errors[0]}
                                          </span>
                                        )}
                                    </div>
                                    <input data-error={field.state.meta.errors?.[0]} value={field.state.value} onChange={e=>field.handleChange(e.target.value)}
                                           className={`data-[error=true]:outline-red-500 focus:outline-primary outline w-full rounded-[8px] outline-neutral-400 px-6 py-4.5 text-preset-4`} />
                                </div>
                            )}
                        </form.Field>

                        <form.Field name={`email`}>
                            {field=>(
                                <div className={`flex flex-col gap-2`}>
                                    <div className={`flex justify-between`}>
                                        <label className={`text-preset-4`}>Email Address</label>
                                    </div>
                                    <input value={field.state.value} onChange={e=>field.handleChange(e.target.value)}
                                           className={`focus:outline-primary outline w-full rounded-[8px] outline-neutral-400 px-6 py-4.5 text-preset-4`} />
                                </div>
                            )}
                        </form.Field>

                        <form.Field name={`phoneNumber`}>
                            {field=>(
                                <div className={`flex flex-col gap-2`}>
                                    <div className={`flex justify-between`}>
                                        <label className={`text-preset-4`}>Phone Number</label>
                                    </div>
                                    <input value={field.state.value} onChange={e=>field.handleChange(e.target.value)}
                                           className={`focus:outline-primary outline w-full rounded-[8px] outline-neutral-400 px-6 py-4.5 text-preset-4`} />
                                </div>
                            )}
                        </form.Field>
                    </fieldset>

                    <fieldset className={`grid md:grid-cols-2 gap-6`}>
                        <h2 className={`col-span-all text-preset-5 text-primary uppercase`}>shipping info</h2>
                        <form.Field name={`address`}>
                            {field=>(
                                <div className={`flex flex-col gap-2`}>
                                    <div className={`flex justify-between`}>
                                        <label className={`text-preset-4`}>Your Address</label>
                                    </div>
                                    <input value={field.state.value} onChange={e=>field.handleChange(e.target.value)}
                                           className={`focus:outline-primary outline w-full rounded-[8px] outline-neutral-400 px-6 py-4.5 text-preset-4`} />
                                </div>
                            )}
                        </form.Field>

                        <form.Field name={`zip`}>
                            {field=>(
                                <div className={`flex flex-col gap-2`}>
                                    <div className={`flex justify-between`}>
                                        <label className={`text-preset-4`}>ZIP Code</label>
                                    </div>
                                    <input value={field.state.value} onChange={e=>field.handleChange(e.target.value)}
                                           className={`focus:outline-primary outline w-full rounded-[8px] outline-neutral-400 px-6 py-4.5 text-preset-4`} />
                                </div>
                            )}
                        </form.Field>

                        <form.Field name={`city`}>
                            {field=>(
                                <div className={`flex flex-col gap-2`}>
                                    <div className={`flex justify-between`}>
                                        <label className={`text-preset-4`}>City</label>
                                    </div>
                                    <input value={field.state.value} onChange={e=>field.handleChange(e.target.value)}
                                           className={`focus:outline-primary outline w-full rounded-[8px] outline-neutral-400 px-6 py-4.5 text-preset-4`} />
                                </div>
                            )}
                        </form.Field>

                        <form.Field name={`country`}>
                            {field=>(
                                <div className={`flex flex-col gap-2`}>
                                    <div className={`flex justify-between`}>
                                        <label className={`text-preset-4`}>Country</label>
                                    </div>
                                    <input value={field.state.value} onChange={e=>field.handleChange(e.target.value)}
                                           className={`focus:outline-primary outline w-full rounded-[8px] outline-neutral-400 px-6 py-4.5 text-preset-4`} />
                                </div>
                            )}
                        </form.Field>
                    </fieldset>

                    <fieldset className={`grid md:grid-cols-2 gap-6`}>
                        <h2 className={`col-span-all text-preset-5 text-primary uppercase`}>payment details</h2>
                        <form.Field name={`paymentType`}>
                            {field=>(
                                <div className={`grid md:grid-cols-2 md:col-span-2 gap-2`}>
                                    <div className={`flex justify-between`}>
                                        <label className={`text-preset-4`}>Payment Method</label>
                                    </div>
                                    <RadioGroup value={field.state.value} onValueChange={e=>field.handleChange(e)}>
                                        <label data-selected={field.state.value===`e-Money`} htmlFor={`e-Money`}
                                               className="data-[selected=true]:outline-primary gap-4 rounded-[8px] flex items-center px-4 py-5 outline outline-neutral-400 focus:outline-primary">
                                            <RadioGroupItem value="e-Money" id="e-Money" />
                                            e-Money
                                        </label>
                                        <label data-selected={field.state.value===`cod`} htmlFor={`cod`}
                                               className="data-[selected=true]:outline-primary gap-4 rounded-[8px] flex items-center px-4 py-5 outline outline-neutral-400 focus:outline-primary">
                                            <RadioGroupItem value="cod" id="cod" />
                                            Cash on Delivery
                                        </label>
                                    </RadioGroup>
                                </div>
                            )}
                        </form.Field>

                        <form.Field name={`eMoneyNumber`}>
                            {field=>(
                                <div className={`flex flex-col gap-2`}>
                                    <div className={`flex justify-between`}>
                                        <label className={`text-preset-4`}>e-Money Number</label>
                                    </div>
                                    <input value={field.state.value} onChange={e=>field.handleChange(e.target.value)}
                                           className={`focus:outline-primary outline w-full rounded-[8px] outline-neutral-400 px-6 py-4.5 text-preset-4`} />
                                </div>
                            )}
                        </form.Field>

                        <form.Field name={`eMoneyPin`}>
                            {field=>(
                                <div className={`flex flex-col gap-2`}>
                                    <div className={`flex justify-between`}>
                                        <label className={`text-preset-4`}>e-Money PIN</label>
                                    </div>
                                    <input value={field.state.value} onChange={e=>field.handleChange(e.target.value)}
                                           className={`focus:outline-primary outline w-full rounded-[8px] outline-neutral-400 px-6 py-4.5 text-preset-4`} />
                                </div>
                            )}
                        </form.Field>
                    </fieldset>
                    <button>Submit</button>
                </form>
                <article className={`bg-white rounded-[8px] xl:w-[350px] h-fit`}>
                    <h2>SUMMARY</h2>
                    <div className={` grid gap-x-4 grid-areas-[thumb_name_quant|thumb_price_quant] items-center`}>
                        <h3 className={`grid-area-[name]`}>XX99 MK II</h3>
                        <span className={`grid-area-[quant]`}>x1</span>
                        <span className={`grid-area-[price]`}>$ 2,999</span>
                        <img src="/audiophile/images/cart/image-xx99-mark-two-headphones.jpg" className={`grid-area-[thumb] rounded-[8px] h-16 w-16`} />
                    </div>
                </article>
            </div>
        </main>
    );
};

export default Page;