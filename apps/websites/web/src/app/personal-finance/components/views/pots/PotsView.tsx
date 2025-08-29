import {getPots} from "@/lib/dynamo";
import colors from "@/app/personal-finance/styles/colors.module.css";

export const PotsView = async () => {
    const pots = await getPots();

    return (
        <article className={`grid grid-cols-2 items-center gap-5 bg-white px-5 py-6 xl:px-8 xl:py-8 rounded-[12px]`}>
            <h2 className={`text-preset-2 text-gray-900`}>Pots</h2>
            <a className={`flex items-center gap-3 justify-self-end text-preset-4 text-gray-500`}>
                See Details <img src="/personal-finance/images/icon-caret-right.svg" /></a>
            <div className={`p-4 grid grid-areas-[img_title_img_value] gap-y-3 gap-x-4 bg-beige-100 max-md:col-span-2 xl:max-w-[25rem]`}>
                <h3 className={`text-preset-4 text-gray-500`}>Total Saved</h3>
                <span className={`text-preset-1 text-gray-900`}>$850</span>
            </div>
            <dl className={`grid grid-cols-2 gap-4 max-md:col-span-2`}>
                {pots.slice(0, 4).map((pot) => (
                    <div data-theme={pot.theme} key={pot.id} className={`flex flex-col gap-1 relative px-4 justify-center ${colors.theme}`}>
                        <div className={`absolute h-full w-1 bg-theme top-0 left-0 rounded-full`}></div>
                        <dt className={`text-preset-5 text-gray-500`}>{pot.name}</dt>
                        <dd className={`text-gray-900 text-preset-4 font-bold`}>${pot.total.toFixed(2)}</dd>
                    </div>
                ))}
            </dl>
        </article>
    );
};