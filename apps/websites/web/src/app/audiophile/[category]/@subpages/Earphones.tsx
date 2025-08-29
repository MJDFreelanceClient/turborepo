import IconArrowRight from "@/app/audiophile/@icons/icon-arrow-right.svg";

export const Earphones = () => {
    return (
        <main className={`flex flex-col xl:gap-24 gap-6`}>
            <h1 className={`bg-black w-full text-white flex justify-center py-8 text-mobile-4 xl:text-preset-7 max-w-desktop-page mx-auto`}>EARPHONES</h1>
            <article className={`flex w-full max-xl:flex-col xl:justify-between gap-8 px-6 max-w-desktop-page mx-auto xl:px-desktop-gutter`}>
                <picture className={`rounded-[8px] overflow-hidden max-w-[540px]`}>
                    <source media="(min-width: 1024px)" srcSet="/audiophile/images/product-yx1-earphones/desktop/image-category-page-preview.jpg" />
                    <source media="(min-width: 768px)" srcSet="/audiophile/images/product-yx1-earphones/tablet/image-category-page-preview.jpg" />
                    <img src="/audiophile/images/product-yx1-earphones/mobile/image-category-page-preview.jpg" />
                </picture>
                <div className={`flex flex-col gap-6 max-xl:items-center justify-center max-xl:text-center`}>
                    <span className={`text-preset-2 tracking-[1.125rem] text-primary`}>NEW PRODUCT</span>
                    <h2 className={`text-mobile-4 max-w-[15ch] uppercase xl:text-preset-7`}>YX1 WIRELESS EARPHONES</h2>
                    <p className={`text-mobile-3 opacity-50 xl:max-w-[48ch]`}>
                        Tailor your listening experience with bespoke dynamic drivers from the new YX1 Wireless Earphones.
                        Enjoy incredible high-fidelity sound even in noisy environments with its active noise cancellation feature.
                    </p>
                    <button className={`py-4 px-8 bg-primary text-white w-fit text-preset-4`}>SEE PRODUCT</button>
                </div>
            </article>

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