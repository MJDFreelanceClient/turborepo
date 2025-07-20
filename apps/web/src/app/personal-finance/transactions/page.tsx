"use client"

import {AddBudget} from "@/app/personal-finance/components/modals/budgets/AddBudget";
import {getTransactions, Transaction} from "@/lib/dynamo";
import {formatCurrency} from "@/lib/money";
import {useQuery} from "@tanstack/react-query";
import {makePipeline} from "@/lib/utils/data/pipeline";
import {useState} from "react";

const Page = () => {
    const [filter, setFilter] = useState<string>("all");
    const [term, setTerm] = useState<string>("Li");
    const [page, setPage] = useState<string>(1);

    const {data:transactions, isLoading} = useQuery({
        queryKey: ['transactions'],
        queryFn: ()=>getTransactions(),
    });

    const pipeline = makePipeline(transactions, {
        filters: {
            active: (t: Transaction) => t.category === "test",
            all:  (t: Transaction) => true,
            transportation: (t: Transaction) => t.category === "General",
        },
        sortBy: {
            latest: (a: Transaction, b: Transaction) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        },
        pageSize: 10,
        searchOptions: {
            keys: ["name", "category"],
            threshold: 0.3,
        },
    });

    const data = pipeline.search(term).filterBy(filter).sortBy("latest").goToPage(page).evaluate();

    if (isLoading) return <div>Loading...</div>;

    return (
        <main className={`flex flex-col gap-8 px-4 py-6 md:px-10 md:py-8 xl:px-10 xl:py-8 w-full`}>
            <header className={`flex items-center justify-between`}>
                <h1 className={`text-preset-1 text-gray-900`}>Budgets</h1>
                <AddBudget />
            </header>
            <section className={`flex flex-col gap-6 bg-white rounded-[12px] p-8`}>
                <button onClick={()=>setFilter("transportation")}>Transportation</button>
                <form className={`flex items-center gap-6`}>
                    <input className={`w-fit`} placeholder={`Search transaction`} value={term} onChange={(e) => setTerm(e.target.value)} />
                    <div className={`flex gap-2 w-fit`}>
                        <label>Sort by</label>
                        <input />
                    </div>
                    <div className={`flex gap-2 w-fit`}>
                        <label>Category</label>
                        <input />
                    </div>
                </form>
                <table>
                    <thead>
                        <tr className={`text-left my-3`}>
                            <th className={`text-gray-500 text-preset-4`}>Recipient / Sender</th>
                            <th className={`text-gray-500 text-preset-4`}>Category</th>
                            <th className={`text-gray-500 text-preset-4`}>Transaction Date</th>
                            <th className={`text-gray-500 text-preset-4 text-end`}>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                    {data.map((transaction) => (
                        <tr key={transaction.id} className={`border-b py-6`}>
                            <td className={`text-gray-900 text-preset-4`}>{transaction.name}</td>
                            <td className={`text-gray-900 text-preset-4`}>{transaction.category}</td>
                            <td className={`text-gray-900 text-preset-4`}>{new Date(transaction.date).toLocaleDateString()}</td>
                            <td className={`text-gray-900 text-preset-4 text-end`}>
                                {formatCurrency(transaction.amount)}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                {Array.from({length: (data.length/10)+1}).map((pageNo, index) => (
                    <button
                        key={index}
                        onClick={() => setPage(index+1)}
                        className={`px-4 py-2 bg-gray-200 rounded-md ${page === pageNo + 1 ? 'bg-blue-500 text-white' : ''}`}
                    >
                        {index + 1}
                    </button>
                ))}
            </section>
        </main>
    );
};

export default Page;