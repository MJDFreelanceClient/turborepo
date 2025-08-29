"use client"

import {getInvoices} from "@/app/invoices/@api/invoices";
import {useQuery} from "@tanstack/react-query";
import {Select, SelectContent, SelectItem, SelectTrigger} from "@/components/input/Select";
import {useState} from "react";
import {formatCurrency} from "@/lib/money";
import {DateTime} from "luxon"
import { default as PlusIcon } from "@/app/invoices/@icons/icon-plus.svg";
import {StatusBadge} from "@/app/invoices/@components/StatusBadge";
import {Invoice} from "@/app/invoices/@api/types";
import modal from "@/lib/reducers/ModalReducer";
import {router} from "next/client";

const filters = (value?:string) => ({
    status: (a:Invoice) => !value || value.toLowerCase() === "all" || a.status.toLowerCase() === value.toLowerCase()
})

const Page = () => {
    const [status, setStatus] = useState<string|undefined>()

    const {data: invoices, isLoading, isError} = useQuery({
        queryKey: ['invoices'],
        queryFn: getInvoices,
    })

    if (isLoading) return <div>Loading...</div>;

    if (isError) return <div>Error...</div>;

    return (
        <main className={`flex flex-col gap-16 max-w-[730px] w-full mt-20`}>
            <menu className={`flex items-center gap-10 dark:text-white`}>
                <header className={`flex flex-col mr-auto gap-[1.5]`}>
                    <h1 className={`text-preset-1`}>Invoices</h1>
                    <p className={`text-preset-2`}>There are 7 total invoices</p>
                </header>
                <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger className={`!w-[200px] !border-0 !outline-0 !ring-0 text-preset-3`}>{status || "Filter by Status"}</SelectTrigger>
                    <SelectContent className={`text-preset-3`}>
                        <SelectItem value="All">All</SelectItem>
                        <SelectItem value="Paid">Paid</SelectItem>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Draft">Draft</SelectItem>
                    </SelectContent>
                </Select>
                <button onClick={()=>modal.open("invoices", "add", {isNew:true})} className={`pl-2 pr-4 py-2 bg-purple-100 text-white rounded-full items-center flex gap-4 text-preset-3`}>
                    <div className={`aspect-square rounded-full w-8 h-8 bg-white flex items-center justify-center`}>
                        <PlusIcon />
                    </div> New Invoice
                </button>
            </menu>

            {invoices && invoices.length > 0 ? <ul className={`gap-4 text-preset-2 text-neutral-300 grid grid-cols-[auto_auto_auto_auto_auto]`}>
                {invoices.filter(filters(status).status).map((invoice, index) => (
                    <li key={index} className={`grid col-span-5 grid-cols-subgrid`}>
                        <a href={`/invoices/${invoice.id}`} className={`grid col-span-5 grid-cols-subgrid gap-10 bg-white dark:bg-purple-300 dark:text-white w-full py-4 px-8 rounded-[8px] items-center text-start`}>
                            <div className={`text-preset-3 text-purple-800 dark:text-white`}><span
                                className={`text-purple-700`}>#</span> {invoice.id}</div>
                            <div>Due {DateTime.fromFormat(invoice.createdAt, "yyyy-mm-dd").toFormat("dd MMM yyyy")}</div>
                            <div>{invoice.clientName}</div>
                            <div className={`text-preset-3 text-purple-800 dark:text-white`}>{formatCurrency(invoice.total)}</div>
                            <StatusBadge status={invoice.status} />
                        </a>
                    </li>
                ))}
            </ul>:
            <div className={`flex flex-col gap-4 text-center items-center justify-center h-full`}>
                <img src="/invoices/illustration-empty.svg" className={`h-[200px] w-[240px] mb-16`} />
                <h1 className={`text-purple-800 text-preset-4 dark:text-white`}>There is nothing here</h1>
                <p className={`text-preset-2 text-purple-600 dark:text-white`}>
                    Create an invoice by clicking the <br />
                    New Invoice button and get started
                </p>
            </div>
            }
        </main>
    );
};

export default Page;