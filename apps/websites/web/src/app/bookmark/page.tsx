import {ContactForm} from "@/app/bookmark/@components/ContactForm";

const Page = () => {
    return (
        <main className={`flex-1 flex flex-col gap-[130px]`}>
            <header className={`flex flex-col-reverse gap-12 md:gap-18`}>
                <div className={`flex flex-col gap-6 items-center text-center w-full px-8`}>
                    <h1 className={`text-preset-1`}>A Simple Bookmark Manager</h1>
                    <p className={`text-preset-2 text-blue-950 opacity-50`}>
                        A clean and simple interface to organize your favourite websites. Open a new browser tab and see your
                        sites load instantly. Try it for free.
                    </p>
                    <div className={`flex gap-4 w-full`}>
                        <button className={`py-2 px-3.5 flex-1 bg-blue-600 text-white rounded-[5px]`}>Get it on Chrome</button>
                        <button className={`py-2 px-3.5 flex-1 bg-gray-50 rounded-[5px]`}>Get it on Firefox</button>
                    </div>
                </div>
                <img src="/bookmark/images/illustration-hero.svg" />
            </header>

            <article className={`flex flex-col gap-10 items-center text-blue-950`}>
                <header className={`flex flex-col gap-4 items-center text-center `}>
                    <h2 className={` text-preset-1`}>Download the extension</h2>
                    <p className={`opacity-50`}>
                        We’ve got more browsers in the pipeline. Please do let us know if you’ve got a favourite you’d like
                        us to prioritize.
                    </p>
                </header>

                <div className={`flex flex-col gap-6 items-center py-8`}>
                    <img src="/bookmark/images/logo-chrome.svg" />
                    <header className={`flex flex-col gap-1 items-center`}>
                        <h3 className={`text-mobile-1`}>Add to Chrome</h3>
                        <span className={`opacity-50`}>Minimum version 62</span>
                    </header>
                    <hr />
                    <button className={`bg-blue-600 text-white px-8 py-2 rounded-[5px]`}>Add & Install Extension</button>
                </div>

                <div className={`flex flex-col gap-6 items-center py-8`}>
                    <img src="/bookmark/images/logo-firefox.svg" />
                    <header className={`flex flex-col gap-1 items-center`}>
                        <h3 className={`text-mobile-1`}>Add to Firefox</h3>
                        <span className={`opacity-50`}>Minimum version 62</span>
                    </header>
                    <hr />
                    <button className={`bg-blue-600 text-white px-8 py-2 rounded-[5px]`}>Add & Install Extension</button>
                </div>

                <div className={`flex flex-col gap-6 items-center py-8`}>
                    <img src="/bookmark/images/logo-opera.svg" />
                    <header className={`flex flex-col gap-1 items-center`}>
                        <h3 className={`text-mobile-1`}>Add to OPera</h3>
                        <span className={`opacity-50`}>Minimum version 62</span>
                    </header>
                    <hr />
                    <button className={`bg-blue-600 text-white px-8 py-2 rounded-[5px]`}>Add & Install Extension</button>
                </div>

                <ContactForm />

            </article>
        </main>
    );
};

export default Page;