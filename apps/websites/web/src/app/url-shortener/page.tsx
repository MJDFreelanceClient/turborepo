import {Shortener} from "@/app/url-shortener/@components/Shortener";

const Page = () => {
    return (
        <main className={`flex flex-col `}>
            <header className={`pb-44 flex flex-col-reverse md:flex-row items-center max-md:text-center px-6 bg-white max-w-[1440px] xl:pl-[165px] mx-auto`}>
                <div className={`flex flex-col max-md:items-center`}>
                    <h1 className={`md:text-preset-h1`}>More than just shorter links</h1>
                    <p className={`md:max-w-[50ch]`}>
                        Build your brand’s recognition and get detailed insights on how your links are performing.
                    </p>
                    <a className={`mt-9 py-3.5 px-10 text-white bg-primary w-fit rounded-full text-preset-2`}>Get Started</a>
                </div>
                <img src="/url-shortener/images/illustration-working.svg" className={`md:max-w-[530px] xl:max-w-[730px] xl:-mr-[125px] xl:ml-auto`} />
            </header>
            <section className={`px-6 flex flex-col gap-20 max-w-[1440px] mx-auto xl:px-[165px]`}>
                <Shortener />

                <article className={`flex flex-col items-center text-center gap-24 md:gap-32`}>
                    <header className={`flex flex-col gap-4`}>
                        <h2 className={`text-mobile-2 text-purple-900`}>Advanced Statistics</h2>
                        <p className={`text-mobile-1 text-purple-200`}>
                            Track how your links are performing across the web with our advanced statistics dashboard.
                        </p>
                    </header>
                    <div className={`grid justify-items-center items-center md:grid-cols-3 text-center gap-24 relative before:content-[""]
                        before:absolute before:w-2 before:h-full md:before:w-full md:before:h-2 before:bg-primary`}>
                        <section className={`md:-translate-y-8 flex flex-col-reverse items-center gap-8 bg-white px-8 pb-10 rounded-[5px] relative`}>
                            <header className={`flex flex-col gap-3`}>
                                <h3 className={`text-preset-5 text-purple-900`}>Brand Recognition</h3>
                                <p className={`text-purple-200 text-preset-7`}>
                                    Boost your brand recognition with each click. Generic links don’t mean a thing. Branded
                                    links help instil confidence in your content.
                                </p>
                            </header>
                            <div className={`-mt-12 flex items-center justify-center w-24 h-24 rounded-full bg-purple-600`}>
                                <img src="/url-shortener/images/icon-brand-recognition.svg" />
                            </div>
                        </section>
                        <section className={`flex flex-col-reverse items-center gap-8 bg-white px-8 pb-10 rounded-[5px] relative`}>
                            <header className={`flex flex-col gap-3`}>
                                <h3 className={`text-preset-5 text-purple-900`}>Detailed Records</h3>
                                <p className={`text-purple-200 text-preset-7`}>
                                    Gain insights into who is clicking your links. Knowing when and where people engage with
                                    your content helps inform better decisions.
                                </p>
                            </header>
                            <div className={`-mt-12 flex items-center justify-center w-24 h-24 rounded-full bg-purple-600`}>
                                <img src="/url-shortener/images/icon-detailed-records.svg" />
                            </div>
                        </section>
                        <section className={`md:translate-y-8 flex flex-col-reverse items-center gap-8 bg-white px-8 pb-10 rounded-[5px] relative`}>
                            <header className={`flex flex-col gap-3`}>
                                <h3 className={`text-preset-5 text-purple-900`}>Fully Customizable</h3>
                                <p className={`text-purple-200 text-preset-7`}>
                                    Improve brand awareness and content discoverability through customizable links, supercharging
                                    audience engagement.
                                </p>
                            </header>
                            <div className={`-mt-12 flex items-center justify-center w-24 h-24 rounded-full bg-purple-600`}>
                                <img src="/url-shortener/images/icon-fully-customizable.svg" />
                            </div>
                        </section>
                    </div>
                </article>
                <article>
                    <h2>Boost your links today</h2>
                    <button>Get Started</button>
                </article>
            </section>
        </main>
    );
};

export default Page;