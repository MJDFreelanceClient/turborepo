import colors from "@/app/personal-finance/styles/colors.module.css";
import {getPots} from "@/lib/dynamo";
import {PotDropdown} from "@/app/personal-finance/components/modals/pots/PotDropdown";
import {AddMoney} from "@/app/personal-finance/components/modals/pots/AddMoney";
import {WithdrawMoney} from "@/app/personal-finance/components/modals/pots/WithdrawMoney";
import {Progress} from "@/components/Progress";
import {formatCurrency} from "@/lib/money";

export const PotView = async () => {
    const pots = await getPots();

    return (
        <>
            {pots.map(pot=>(
                <article data-theme={pot.theme} key={pot.id} className={`${colors.theme} flex flex-col gap-8 bg-white rounded-[12px] p-6`}>
                    <header className={`flex justify-between`}>
                        <h2 className={`flex items-center gap-4`}>
                            <div className={`h-4 w-4 rounded-full bg-theme`}></div>
                            {pot.name}</h2>
                        <PotDropdown id={pot.id} />
                    </header>
                    <section className={`flex flex-col gap-4`}>
                        <dl className={`flex items-center justify-between`}>
                            <dt className={`txt-preset-4 text-gray-500`}>Total Saved</dt>
                            <dd className={`text-preset-1 text-gray-900 font-bold`}>{formatCurrency(pot.total)}</dd>
                        </dl>
                        <Progress value={(pot.total*100/pot.target)}  />
                        <div className={`flex items-center justify-between text-preset-5 text-gray-500`}>
                            <span className={`font-bold`}>{(pot.total*100/pot.target).toFixed(2)}%</span>
                            <span>Target of {formatCurrency(pot.target)}</span>
                        </div>
                    </section>
                    <section className={`flex gap-4 w-full text-preset-4 font-bold text-gray-900`}>
                        <AddMoney />
                        <WithdrawMoney />
                    </section>
                </article>
            ))}
        </>
    );
};