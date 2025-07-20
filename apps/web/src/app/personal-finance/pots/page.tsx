import {PotView} from "@/app/personal-finance/components/views/pots/PotView";
import {AddPot} from "@/app/personal-finance/components/modals/pots/AddPot";
import {EditPot} from "@/app/personal-finance/components/modals/pots/EditPot";

const Page = () => {
    return (
        <main className={`flex flex-col gap-8 px-4 py-6 md:px-10 md:py-8 xl:px-10 xl:py-8 w-full`}>
            <header className={`flex items-center justify-between`}>
                <h1 className={`text-preset-1 text-gray-900`}>Pots</h1>
                <AddPot />
            </header>
            <div className={`grid xl:grid-cols-2 gap-6`}>
                <PotView />
            </div>
            <EditPot />
        </main>
    );
};

export default Page;