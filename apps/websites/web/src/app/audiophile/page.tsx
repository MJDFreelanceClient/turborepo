import IconArrowRight from "@/app/audiophile/@icons/icon-arrow-right.svg";

const Page = () => {
    return (
        <main className={`flex flex-col xl:gap-24 gap-6`}>
            <header className={`grid grid-areas-[content] mx-auto max-w-desktop-page`}>
                <section className={`xl:px-desktop-gutter gap-6 grid-area-[content] z-10 text-white w-full h-full flex flex-col 
                        justify-center xl:w-fit max-xl:items-center`}>
                    <div className={`text-preset-2 opacity-50 uppercase`}>NEW PRODUCT</div>
                    <h1 className={`text-mobile-1 xl:text-preset-1 max-w-[15ch] uppercase max-xl:text-center`}>XX99 Mark II HeadphoneS</h1>
                    <p className={`max-w-[40ch] max-xl:text-center text-preset-3 opacity-75`}>
                        Experience natural, lifelike audio and exceptional build quality made for the passionate music enthusiast.
                    </p>
                    <button className={`w-fit text-preset-4 px-8 py-4 bg-primary`}>SEE PRODUCT</button>
                </section>
                <picture className={`grid-area-[content]`}>
                    <source media="(min-width: 1024px)" srcSet="/audiophile/images/home/desktop/image-hero.jpg" />
                    <source media="(min-width: 768px)" srcSet="/audiophile/images/home/tablet/image-header.jpg" />
                    <img src="/audiophile/images/home/mobile/image-header.jpg" />
                </picture>
            </header>

            <section className={`rounded-[8px] grid md:grid-cols-3 mx-6 gap-4.5 max-w-desktop-page  xl:px-desktop-gutter xl:mx-auto`}>
               <div className={`relative flex flex-col gap-4 items-center bg-neutral-200 mt-13 pb-5`}>
                   <img src="/audiophile/images/shared/desktop/image-category-thumbnail-headphones.png"
                        className={`-mt-13 max-md:h-[165px]`}/>
                   <h2 className={`text-mobile-2 xl:text-preset-6 -mt-6`}>HEADPHONES</h2>
                   <a className={`text-preset-4 flex gap-3 items-center`}>SHOP <IconArrowRight /></a>
               </div>
                <div className={`relative flex flex-col gap-4 items-center bg-neutral-200 mt-13 pb-5`}>
                    <img src="/audiophile/images/shared/desktop/image-category-thumbnail-speakers.png"
                         className={`-mt-13 max-md:h-[165px]`}/>
                    <h2 className={`text-mobile-2 xl:text-preset-6 -mt-6`}>SPEAKERS</h2>
                    <a className={`text-preset-4 flex gap-3 items-center`}>SHOP <IconArrowRight /></a>
                </div>
                <div className={`relative flex flex-col gap-4 items-center bg-neutral-200 mt-13 pb-5`}>
                    <img src="/audiophile/images/shared/desktop/image-category-thumbnail-earphones.png"
                         className={`-mt-13 max-md:h-[165px]`}/>
                    <h2 className={`text-mobile-2 xl:text-preset-6 -mt-6`}>EARPHONES</h2>
                    <a className={`text-preset-4 flex gap-3 items-center`}>SHOP <IconArrowRight /></a>
                </div>
            </section>

            <section className={`grid xl:grid-cols-2 gap-8 xl:w-full max-w-desktop-content xl:mx-auto mx-6
                    justify-items-center bg-primary overflow-hidden max-xl:py-14 max-xl:px-20 rounded-[8px]`}>
                <img src="/audiophile/images/home/desktop/image-speaker-zx9.png"
                     className={`xl:h-[80%] mt-auto xl:translate-y-[3%] xl:translate-x-[20%]`} />
                <div className={`flex flex-col gap-6 self-center max-xl:text-center max-xl:items-center text-white`}>
                    <h2 className={`text-mobile-1 xl:text-preset-1`}>ZX9 <br /> SPEAKER</h2>
                    <p className={`text-mobile-3 opacity-75 xl:max-w-[30ch]`}>
                        Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound.
                    </p>
                    <button className={`text-white bg-black py-4 px-8 w-fit text-preset-4`}>SEE PRODUCT</button>
                </div>
            </section>

            <section className={`grid items-center grid-areas-[content] max-w-desktop-content xl:mx-auto mx-6`}>
                <picture className={`grid-area-[content]`}>
                    <source media="(min-width: 1024px)" srcSet="/audiophile/images/home/desktop/image-speaker-zx7.jpg" />
                    <source media="(min-width: 768px)" srcSet="/audiophile/images/home/tablet/image-speaker-zx7.jpg" />
                    <img src="/audiophile/images/home/mobile/image-speaker-zx7.jpg" />
                </picture>
                <section className={`flex flex-col gap-8 grid-area-[content] px-6 xl:px-24`}>
                    <h2 className={`text-mobile-4`}>ZX7 SPEAKER</h2>
                    <a className={`px-7 py-4 border w-fit text-preset-4`}>SEE PRODUCT</a>
                </section>
            </section>

            <section className={`grid md:grid-cols-2 gap-6 items-center  max-w-desktop-content xl:mx-auto mx-6`}>
                <picture className={``}>
                    <source media="(min-width: 1024px)" srcSet="/audiophile/images/home/desktop/image-earphones-yx1.jpg" />
                    <source media="(min-width: 768px)" srcSet="/audiophile/images/home/tablet/image-earphones-yx1.jpg" />
                    <img src="/audiophile/images/home/mobile/image-earphones-yx1.jpg" />
                </picture>
                <section className={`flex flex-col gap-8 px-6 xl:px-24 bg-neutral-200 h-full justify-center rounded-[8px] py-10`}>
                    <h2 className={`text-mobile-4`}>YX1 EARPHONES</h2>
                    <a className={`px-7 py-4 border w-fit text-preset-4`}>SEE PRODUCT</a>
                </section>
            </section>

            <section className={`flex gap-10 flex-col xl:flex-row-reverse xl:gap-[125px] max-w-desktop-content xl:mx-auto mx-6`}>
                <picture className={``}>
                    <source media="(min-width: 1024px)" srcSet="/audiophile/images/shared/desktop/image-best-gear.jpg" />
                    <source media="(min-width: 768px)" srcSet="/audiophile/images/shared/tablet/image-best-gear.jpg" />
                    <img src="/audiophile/images/shared/mobile/image-best-gear.jpg" />
                </picture>
                <div className={`flex flex-col gap-8 justify-center max-xl:text-center`}>
                    <h2 className={`text-mobile-4 uppercase max-w-[20ch]`}>Bringing you the <span className={`text-primary`}>best</span> audio gear</h2>
                    <p className={`text-mobile-3 max-w-[50ch]`}>
                        Located at the heart of New York City, Audiophile is the premier store for high end headphones,
                        earphones, speakers, and audio accessories. We have a large showroom and luxury demonstration
                        rooms available for you to browse and experience a wide range of our products. Stop by our store
                        to meet some of the fantastic people who make Audiophile the best place to buy your portable
                        audio equipment.
                    </p>
                </div>
            </section>
        </main>
    );
};

export default Page;