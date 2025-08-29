const Page = () => {
    return (
        <main className={`flex flex-col gap-8 px-4 py-6 md:px-10 md:py-8 xl:px-10 xl:py-8 w-full`}>
            <header className={`flex items-center justify-between`}>
                <h1 className={`text-preset-1 text-gray-900`}>Recurring Bills</h1>
            </header>
            <div className={`flex max-xl:flex-col gap-6`}>
                <section className={`flex flex-col gap-8 p-6 bg-gray-900 text-white rounded-[12px]`}>
                    <img src="/personal-finance/images/icon-recurring-bills.svg" className={`w-8`} />
                    <dl className={`flex flex-col gap-3`}>
                        <dt className={`text-preset-4`}>Total Bills</dt>
                        <dd className={`text-preset-1`}>$384.98</dd>
                    </dl>
                </section>

                <section className={`flex flex-col gap-5 p-5 bg-white`}>
                    <h2 className={`text-preset-3 text-gray-900`}>Summary</h2>
                    <dl className={`text-preset-5`}>
                        <div className={`flex items-center justify-between pb-5`}>
                            <dt>Paid Bills</dt>
                            <dd className={`text-gray-900 font-bold`}>4 ($190.00)</dd>
                        </div>
                        <div className={`flex items-center justify-between py-5 border-t border-neutral-500`}>
                            <dt>Total Upcoming</dt>
                            <dd className={`text-gray-900 font-bold`}>4 ($190.00)</dd>
                        </div>
                        <div className={`flex items-center justify-between pt-5 border-t border-neutral-500`}>
                            <dt className={`text-red-900`}>Due Soon</dt>
                            <dd className={`text-red-900 font-bold`}>4 ($190.00)</dd>
                        </div>
                    </dl>
                </section>
            </div>
        </main>
    );
};

export default Page;