import {BudgetView} from "@/app/personal-finance/components/views/budgets/BudgetView";
import {SpendingSummary} from "@/app/personal-finance/components/views/budgets/SpendingSummary";
import {EditBudget} from "@/app/personal-finance/components/modals/budgets/EditBudget";
import {AddBudget} from "@/app/personal-finance/components/modals/budgets/AddBudget";

const Page = () => {
    return (
        <main className={`flex flex-col gap-8 px-4 py-6 md:px-10 md:py-8 xl:px-10 xl:py-8 w-full`}>
            <header className={`flex items-center justify-between`}>
                <h1 className={`text-preset-1 text-gray-900`}>Budgets</h1>
                <AddBudget />
            </header>
            <div className={`flex max-xl:flex-col gap-6`}>
                <SpendingSummary />
                <BudgetView />
            </div>
            <EditBudget />
        </main>
    );
};

export default Page;