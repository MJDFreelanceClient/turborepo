import {getTransactions} from "@/lib/dynamo";
import {formatCurrency} from "@/lib/money";
import {formatDate} from "@/lib/date";

export const Transactions = async () => {
    const transactions = await getTransactions();

    return (
        <article className={`grid grid-cols-2 items-center gap-5 bg-white px-5 py-6 xl:px-8 xl:py-8 rounded-[12px]`}>
            <h2 className={`text-preset-2 text-gray-900`}>Transactions</h2>
            <a className={`flex items-center gap-3 justify-self-end text-preset-4 text-gray-500`}>
                View All <img src="/personal-finance/images/icon-caret-right.svg" /></a>
            <table className={`col-span-2 w-full`}>
                <tbody>
                    {transactions.slice(0, 5).map((transaction) => (
                        <tr key={transaction.id} className={`flex items-center py-5 gap-4`}>
                            <td><img src={transaction.avatar} className={`w-10 h-10 aspect-square rounded-full`} /></td>
                            <td className={`flex-1 text-gray-900 text-preset-4 font-bold`}>{transaction.name}</td>
                            <td className={`flex flex-col gap-2`}>
                                <span className={`text-end text-green-500 text-preset-4 font-bold`}>
                                    {formatCurrency(transaction.amount)}</span>
                                <span className={`text-preset-5 text-gray-500`}>{formatDate(transaction.date)}</span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </article>
    );
};