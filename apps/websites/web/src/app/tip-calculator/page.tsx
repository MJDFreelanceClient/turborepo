import IconDollar from "./@icons/icon-dollar.svg";
import IconPerson from "./@icons/icon-person.svg";

const Page = () => {
    return (
        <main className={`max-w-[920px] flex gap-8 max-xl:flex-col bg-white py-8 px-6 rounded-t-panel-mobile xl:rounded-b-panel-mobile max-xl:flex-1 w-full box-border`}>
            <form className={`flex flex-col gap-8 flex-1`}>
                <label className={`flex flex-col gap-2 w-full`}>
                    <span className={`text-gray-500 text-preset-5`}>Bill</span>
                    <div className={`relative`}>
                        <input className={`bg-gray-50 w-full flex text-end px-4 py-2 text-green-900 text-preset-3`} placeholder={`0`} />
                        <div className={`absolute left-4 inset-y-0 flex items-center`}>
                            <IconDollar />
                        </div>
                    </div>
                </label>

                <fieldset className={`flex flex-col gap-2 w-full`}>
                    <legend className={`text-gray-500 text-preset-5`}>Select Tip %</legend>
                    <div>
                        <label>
                            <input type="radio" name="choice" value="A" className="visually-hidden"/>
                            10%
                        </label><br/>

                        <label>
                            <input type="radio" name="choice" value="B" className="visually-hidden"/>
                            15%
                        </label><br/>

                        <label>
                            <input type="radio" name="choice" value="other" id="choice-other" className="visually-hidden"/>
                            <span className="visually-hidden">Other</span>
                            <input type="text" name="otherText" id="otherText" placeholder={`Other`}
                                   aria-labelledby="choice-other otherText-label"/>
                            <span id="otherText-label" className="visually-hidden">Specify other option</span>
                        </label>
                    </div>
                </fieldset>

                <label className={`flex flex-col gap-2 w-full`}>
                    <span className={`text-gray-500 text-preset-5`}>Number of People</span>
                    <div className={`relative`}>
                        <input className={`bg-gray-50 w-full flex text-end px-4 py-2 text-green-900 text-preset-3`}
                               placeholder={`0`}/>
                        <div className={`absolute left-4 inset-y-0 flex items-center`}>
                            <IconPerson/>
                        </div>
                    </div>
                </label>
            </form>

            <div className={`flex flex-col justify-between gap-8 p-6 bg-green-900 rounded-[1rem] flex-1`}>
                <dl className={`flex flex-col gap-6 text-white`}>
                    <div className={`flex justify-between items-start`}>
                        <dt className={`flex flex-col text-preset-5`}>Tip Amount
                            <span className={`text-preset-6 text-gray-400`}>/ person</span></dt>
                        <dd className={`text-green-400 text-mobile-1 xl:text-preset-1`}>$4.27</dd>
                    </div>
                    <div className={`flex justify-between items-start`}>
                        <dt className={`flex flex-col text-preset-5`}>Total
                            <span className={`text-preset-6 text-gray-400`}>/ person</span></dt>
                        <dd className={`text-green-400 text-mobile-1 xl:text-preset-1`}>$32.79</dd>
                    </div>
                </dl>
                <button className={`text-green-900 text-preset-4 py-2 bg-green-400 rounded-input-mobile`}>RESET</button>
            </div>
        </main>
    );
};

export default Page;