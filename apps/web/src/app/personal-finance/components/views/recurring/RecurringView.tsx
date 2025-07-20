export const RecurringView = async () => {

    return (
        <article className={`grid grid-cols-[1fr_auto] items-center gap-5 bg-white px-5 py-6 xl:px-8 xl:py-8 rounded-[12px] h-full auto-rows-min`}>
            <h2 className={`text-preset-2 text-gray-900`}>Recurring Bills</h2>
            <a className={`flex items-center gap-3 justify-self-end text-preset-4 text-gray-500`}>
                See Details <img src="/personal-finance/images/icon-caret-right.svg" /></a>
            <div className={`h-full col-span-2`}>

            </div>
        </article>
    );
};