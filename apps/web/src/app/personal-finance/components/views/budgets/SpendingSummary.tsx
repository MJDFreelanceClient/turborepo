import {getBudgets} from "@/lib/dynamo";
import colors from "@/app/personal-finance/styles/colors.module.css";
import {BudgetChart} from "@/app/personal-finance/components/views/budgets/BudgetChart";

export const SpendingSummary = async () => {
    const budgets = await getBudgets();

    return (
        <article className={`grid grid-cols-2 items-center gap-5 bg-white p-8 rounded-[12px] px-5 py-6 xl:px-8 xl:py-8 
                w-full auto-rows-min h-fit px-5 py-6 xl:px-8 xl:py-8`}>
            <BudgetChart />
            <h2 className={`text-preset-2 text-gray-900 col-span-2`}>Spending Summary</h2>
            <dl className={`grid col-span-2 gap-4 max-md:col-span-2`}>
                {budgets.slice(0, 4).map((budget, index) => (
                    <div data-theme={budget.theme} key={budget.id} className={`flex gap-1 relative 
                            ${index!==0&&`border-t border-gray-100 pt-4`} ${colors.theme}`}>
                        <div className={`h-full w-1 bg-theme rounded-full mr-4`}></div>
                        <dt className={`text-preset-4 text-gray-500 mr-auto`}>{budget.category}</dt>
                        <dd className={`text-gray-900 text-preset-4 font-bold flex items-center gap-2`}>
                            <span className={`text-preset-3 text-gray-900`}>
                                ${budget.maximum.toFixed(2)}</span>
                            <span className={`text-preset-5 text-gray-500`}>of ${budget.maximum}</span>
                        </dd>
                    </div>
                ))}
            </dl>
        </article>
    );
};