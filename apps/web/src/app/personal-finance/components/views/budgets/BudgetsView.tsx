import {getBudgets} from "@/lib/dynamo";
import colors from "@/app/personal-finance/styles/colors.module.css";

export const BudgetsView = async () => {
    const budgets = await getBudgets();

    return (
        <article className={`grid grid-cols-2 items-center gap-5 bg-white p-8 rounded-[12px] px-5 py-6 xl:px-8 xl:py-8`}>
            <h2 className={`text-preset-2 text-gray-900`}>Budgets</h2>
            <a className={`flex items-center gap-3 justify-self-end text-preset-4 text-gray-500`}>
                See Details <img src="/personal-finance/images/icon-caret-right.svg" /></a>
            <dl className={`grid gap-4 max-md:col-span-2`}>
                {budgets.slice(0, 4).map((budget) => (
                    <div data-theme={budget.theme} key={budget.id} className={`flex flex-col gap-1 relative px-4 justify-center ${colors.theme}`}>
                        <div className={`absolute h-full w-1 bg-theme top-0 left-0 rounded-full`}></div>
                        <dt className={`text-preset-5 text-gray-500`}>{budget.category}</dt>
                        <dd className={`text-gray-900 text-preset-4 font-bold`}>${budget.maximum.toFixed(2)}</dd>
                    </div>
                ))}
            </dl>
        </article>
    );
};