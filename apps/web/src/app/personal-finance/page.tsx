import {PotsView} from "@/app/personal-finance/components/views/pots/PotsView";
import {Transactions} from "@/app/personal-finance/components/views/transactions/Transactions";
import {BudgetsView} from "@/app/personal-finance/components/views/budgets/BudgetsView";
import {RecurringView} from "@/app/personal-finance/components/views/recurring/RecurringView";

const Page = () => {
    return (
        <main className={`flex flex-col gap-8 px-4 py-6 md:px-10 md:py-8 xl:px-10 xl:py-8`}>
            <h1 className={`text-preset-1 text-gray-900`}>Overview</h1>
            <dl className={`grid md:grid-cols-3 gap-6`}>
                <div className={`flex flex-col gap-3 p-5 md:p-6 bg-gray-900 text-white text-preset-4 rounded-[12px]`}>
                    <dt>Current Balance</dt>
                    <dd className={`text-preset-1`}>$4,836.00</dd>
                </div>
                <div className={`flex flex-col gap-3 p-5 md:p-6 bg-white rounded-[12px]`}>
                    <dt className={`text-gray-500`}>Income</dt>
                    <dd className={`text-gray-900 text-preset-1`}>$3,814.25</dd>
                </div>
                <div className={`flex flex-col gap-3 p-5 md:p-6 bg-white rounded-[12px]`}>
                    <dt className={`text-gray-500`}>Expenses</dt>
                    <dd className={`text-gray-900 text-preset-1`}>$1,700.50</dd>
                </div>
            </dl>
            <section className={`flex max-xl:flex-col gap-6`}>
                <div className={`flex flex-col gap-6 w-full`}>
                    <PotsView />
                    <Transactions />
                </div>
                <div className={`flex flex-col gap-6 xl:min-w-[428px] xl:w-7/10 max-xl:w-full`}>
                    <BudgetsView />
                    <RecurringView />
                </div>
            </section>
        </main>
    );
};

export default Page;