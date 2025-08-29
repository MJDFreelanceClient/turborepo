import colors from '@/app/crowdfunding/styles/colors.module.css';
import text from '@/app/crowdfunding/styles/text.module.css';

const Page = () => {
    return (
        <div className={`min-h-screen text-preset-2 bg-gray-50 ${colors.setup} ${text.setup}`}>
            <section className={`grid mx-auto w-fit`}>
                <div className={`flex items-center justify-between w-[1109px] mx-auto text-white h-fit py-12
                        row-start-1 z-10 col-start-1`}>
                    crowdfund
                    <menu className={`flex gap-8 items-center text-preset-9`}>
                        <a>About</a>
                        <a>Discover</a>
                        <a>Get Started</a>
                    </menu>
                </div>
                <picture className={`row-start-1 col-start-1`}>
                    <source media="(min-width: 1024px)" srcSet="/crowdfunding/images/image-hero-desktop.jpg" />
                    <img src="/crowdfunding/images/image-hero-mobile.jpg" alt={``} />
                </picture>
                <div className={`w-full h-[128px] bg-gradient-to-b from-black to-neutral-50 row-start-1 col-start-1`}></div>
            </section>

            <main className={`flex flex-col gap-6 w-[730px]  mx-auto -mt-32 text-preset-6`}>
                <header className={`flex flex-col gap-8 bg-white px-12 py-14 relative text-center`}>
                    <div className={`flex flex-col gap-2`}>
                        <h1>Mastercraft Bamboo Monitor Riser</h1>
                        <p>
                            A beautiful & handcrafted monitor stand to reduce neck and eye strain.
                        </p>
                    </div>
                    <div className={`flex justify-between`}>
                        <a className={`w-fit`}>Back this project</a>
                    </div>
                </header>

                <section className={`flex flex-col gap-8 bg-white p-12`}>
                    <dl className={`grid grid-cols-3 gap-12`}>
                        <div className={`flex flex-col-reverse border-r border-gray-400`}>
                            <dt>of $100,000 backed</dt>
                            <dd className={`text-preset-1`}>$89,914</dd>
                        </div>
                        <div className={`flex flex-col-reverse border-r border-gray-400`}>
                            <dt>of $100,000 backed</dt>
                            <dd className={`text-preset-1`}>$89,914</dd>
                        </div>
                        <div className={`flex flex-col-reverse`}>
                            <dt>of $100,000 backed</dt>
                            <dd className={`text-preset-1`}>$89,914</dd>
                        </div>
                    </dl>
                </section>
            </main>
        </div>
    );
};

export default Page;