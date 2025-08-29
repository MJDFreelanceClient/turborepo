"use client"

import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {deleteInvoice, getInvoice} from "@/app/invoices/@api/invoices";
import {StatusBadge} from "@/app/invoices/@components/StatusBadge";
import {use} from "react";
import LeftArrow from "@/app/invoices/@icons/icon-arrow-left.svg"
import {useRouter} from "next/navigation"
import {formatCurrency} from "@/lib/money";;
import modal from "@/lib/reducers/ModalReducer"
import {InvoiceItem} from "@/app/invoices/@api/types";

const Page = ({params}:{params:any}) => {
    const unwrappedParams:{id:string} = use(params);

    const router = useRouter();

    const {data: invoice, isLoading, isError} = useQuery({
        queryKey: ['invoice', unwrappedParams.id],
        queryFn: ()=>getInvoice(unwrappedParams.id)
    })

    const queryClient = useQueryClient();

    const { mutate: handleDeleteInvoice, isPending } = useMutation({
        mutationFn: async (id: string) => {
            try {
                await deleteInvoice(id);
            }
            catch (e) {
                console.error(e);
            }
        },
        onSuccess: (_, id) => {
            queryClient.invalidateQueries({ queryKey: ["invoices"] });
            queryClient.invalidateQueries({ queryKey: ["invoice", id] });
        }
    });

    if (isLoading || !invoice) return <div>Loading...</div>;

    if (isError) return <div>Error...</div>;

    return (
        <main className={`flex flex-col max-w-[730px] w-full gap-6 pt-16 dark:bg-neutral-700`}>
            <button className={`flex w-fit items-center gap-4 dark:text-white`} onClick={router.back}><LeftArrow /> Go back</button>

            <menu className={`bg-white flex gap-4 items-center justify-between px-8 py-5 text-preset-3 rounded-[8px] dark:bg-purple-300`}>
                <div className={`md:mr-auto flex gap-4 items-center text-preset-2 text-neutral-300 dark:text-white`}>
                    Status <StatusBadge showChevron={false} status={invoice.status}  />
                </div>
                <button onClick={()=>modal.open("invoices", "edit", invoice)} className={`max-md:hidden bg-neutral-200 text-purple-700 py-5 px-6 rounded-full`}>Edit</button>
                <button onClick={()=>handleDeleteInvoice(invoice.id)} className={`max-md:hidden bg-red-500 text-white py-5 px-6 rounded-full`}>Delete</button>
                <button className={`max-md:hidden bg-purple-100 text-white py-5 px-6 rounded-full`}>Mark as Paid</button>
            </menu>

            <article className={`p-12 rounded-[8px] bg-white grid grid-cols-2 md:grid-cols-3 gap-y-5 dark:bg-purple-300 dark:text-white`}>
                <header className={`flex flex-col gap-2 col-span-2`}>
                    <h2 className={`text-purple-800 dark:text-white text-preset-3 leading-[1.5]`}><span className={`text-purple-700 text-preset-2`}>#</span> {invoice.id}</h2>
                    <span className={`text-purple-700 text-preset-2 dark:text-white`}>{invoice.description}</span>
                </header>

                <address className={`flex flex-col not-italic text-purple-700 text-preset-2 md:text-end dark:text-white max-md:col-span-2`}>
                    <span>{invoice.senderAddress.street}</span>
                    <span>{invoice.senderAddress.city}</span>
                    <span>{invoice.senderAddress.postCode}</span>
                    <span>{invoice.senderAddress.country}</span>
                </address>

                <dl className={`flex flex-col gap-8`}>
                    <div className={`flex flex-col gap-3`}>
                        <dt className={`text-purple-700 text-preset-2 dark:text-white`}>Invoice Date</dt>
                        <dd className={`text-preset-3 text-purple-800 leading-[20px] dark:text-white`}><time>{invoice.createdAt}</time></dd>
                    </div>

                    <div className={`flex flex-col gap-3`}>
                        <dt className={`text-purple-700 text-preset-2 dark:text-white`}>Payment Duw</dt>
                        <dd className={`text-preset-3 text-purple-800 leading-[20px] dark:text-white`}><time>{invoice.paymentDue}</time></dd>
                    </div>
                </dl>

                <section className={`flex flex-col gap-2`}>
                    <dl>
                        <div className={`flex flex-col gap-3`}>
                            <dt className={`text-purple-700 text-preset-2 dark:text-white`}>Bill to</dt>
                            <dd className={`text-preset-3 text-purple-800 leading-[20px] dark:text-white`}>{invoice.clientName}</dd>
                        </div>
                    </dl>
                    <address className={`flex flex-col not-italic text-purple-700 text-preset-2 dark:text-white`}>
                        <span>{invoice.senderAddress.street}</span>
                        <span>{invoice.senderAddress.city}</span>
                        <span>{invoice.senderAddress.postCode}</span>
                        <span>{invoice.senderAddress.country}</span>
                    </address>
                </section>

                <dl>
                    <div className={`flex flex-col gap-3`}>
                        <dt className={`text-purple-700 text-preset-2 dark:text-white`}>Sent to</dt>
                        <dd className={`text-preset-3 text-purple-800 leading-[20px] dark:text-white`}>{invoice.clientEmail}</dd>
                    </div>
                </dl>

                <section className={`col-span-2 md:col-span-3`}>
                    <table className={`w-full border-separate border-spacing-8 bg-neutral-200 rounded-t-[8px] dark:bg-neutral-400`}>
                        <thead className={`text-preset-2 text-purple-700 leading-[1.5] dark:text-white`}>
                        <tr>
                            <th className={`text-start`}>Item Name</th>
                            <th className={`text-center`}>QTY.</th>
                            <th className={`text-end max-md:hidden`}>Price</th>
                            <th className={`text-end max-md:hidden`}>Total</th>
                        </tr>
                        </thead>
                        <tbody>
                        {invoice.items.map((item:InvoiceItem, index:number) => (
                            <tr key={index} className={`text-preset-3 text-purple-700 dark:text-white`}>
                                <td className={`text-purple-800 dark:text-white`}>{item.name}</td>
                                <td className={`text-center`}>{item.quantity}</td>
                                <td className={`text-end max-md:hidden`}>{formatCurrency(item.price)}</td>
                                <td className={`text-purple-800 dark:text-white text-end max-md:hidden`}>{formatCurrency(item.total)}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <dl className={`flex justify-between items-center px-8 py-7 bg-neutral-900 text-white rounded-b-[8px] bg-purple-800`}>
                        <dt className={`text-preset-2`}>Amount Due</dt>
                        <dd className={`text-preset-5`}>{formatCurrency(invoice.total)}</dd>
                    </dl>
                </section>
            </article>
        </main>
    );
};

export default Page;