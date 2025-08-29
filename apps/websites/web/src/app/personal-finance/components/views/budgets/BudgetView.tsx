import {getBudgets, getTransactions} from "@/lib/dynamo";
import {formatCurrency} from "@/lib/money";
import {formatDate} from "@/lib/date";
import colors from "@/app/personal-finance/styles/colors.module.css";
import {Progress} from "@/components/Progress";
import {BudgetDropdown} from "@/app/personal-finance/components/modals/budgets/BudgetDropdown";

export const BudgetView = async () => {
    const budgets= await getBudgets();
    const transactions = await getTransactions();
    const budgetTransactions = (category:string)=>{
        return transactions.filter(t=>t.category===category);
    }
    const spent = (category:string) => {
        const transactions = budgetTransactions(category);
        return transactions.reduce((total, transaction) => total + transaction.amount, 0)*-1;
    }

    return (
        <section className={`flex flex-col gap-6 w-full`}>
            {budgets.map((budget) => (
                <article data-theme={budget.theme} key={budget.id}
                         className={`flex flex-col gap-5 bg-white px-5 py-6 xl:px-8 xl:py-8 rounded-[12px] ${colors.theme}`}>
                    <header className={`flex items-center justify-between`}>
                        <h2 className="flex gap-4 items-center text-xl font-bold">
                            <div className={`h-4 w-4 rounded-full bg-theme`}></div>
                            {budget.category}</h2>
                        <BudgetDropdown id={budget.id} />
                    </header>
                    <section className={`flex flex-col gap-4 text-gray-500 `}>
                        <h3 className={`text-preset-4`}>Maximum of {formatCurrency(budget.maximum)}</h3>
                        <Progress style={`width`} value={(budget.maximum+spent(budget.category)/budget.maximum)} className={`h-6 p-1 !rounded-[4px]`}  />
                        <dl className={`flex`}>
                            <div className={`flex flex-1`}>
                                <div className={`h-full w-1 mr-4 bg-beige-100 rounded-full bg-theme`}></div>
                                <div className={`flex-1 text-preset-5`}>
                                    <dt>Spent</dt>
                                    <dd className={`text-preset-4 font-bold text-gray-900`}>
                                        {formatCurrency(spent(budget.category))}</dd>
                                </div>
                            </div>
                            <div className={`flex flex-1`}>
                                <div className={`h-full w-1 mr-4 bg-beige-100 rounded-full`}></div>
                                <div className={`flex-1 text-preset-5`}>
                                    <dt>Remaining</dt>
                                    <dd className={`text-preset-4 font-bold text-gray-900`}>
                                        {formatCurrency(budget.maximum-spent(budget.category))}</dd>
                                </div>
                            </div>
                        </dl>
                    </section>
                    <section className={`flex flex-col gap-5 col-span-2 w-full bg-beige-100 p-5 rounded-[12px]`}>
                        <header className={`flex justify-between items-center`}>
                            <h2 className={`text-preset-3 text-gray-900`}>Latest Spending</h2>
                            <a className={`flex items-center gap-3 justify-self-end text-preset-4 text-gray-500`}>
                                See All <img src="/personal-finance/images/icon-caret-right.svg" /></a>
                        </header>
                        <table className={`w-full`}>
                            <tbody>
                            {budgetTransactions(budget.category).slice(0, 3).map((transaction, index) => (
                                <tr key={transaction.id} className={`flex items-center py-3 gap-4 ${index!==0&&'border-t border-neutral-500'}`}>
                                    <td className={`max-md:hidden`}><img src={transaction.avatar} className={`w-10 h-10 aspect-square rounded-full`} /></td>
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
                    </section>
                </article>
            ))}
        </section>
    );
};