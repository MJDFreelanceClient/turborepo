import IconArrowRight from "@/app/audiophile/@icons/icon-arrow-right.svg";
import {BasketAdder} from "@/app/audiophile/[category]/[product]/@components/BasketAdder";
import {getProduct} from "@/app/audiophile/@api/products";
import {formatCurrency} from "@/lib/money";

const Page = async ({params:{category, product}}:{params: {
        category: string,
        product: string
    }}) => {

    const productDetail = await getProduct(product);

    if (!productDetail || productDetail.category !== category) return (<>404</>)

    return (
        <main className={`flex flex-col xl:gap-24 gap-6`}>
            <h1 className={`bg-black w-full text-white flex justify-center py-8 text-mobile-4 xl:text-preset-7 max-w-desktop-page mx-auto`}>EARPHONES</h1>
            <article className={`flex w-full max-xl:flex-col xl:justify-between gap-8 px-6 max-w-desktop-page mx-auto xl:px-desktop-gutter`}>
                <picture className={`rounded-[8px] overflow-hidden max-w-[540px]`}>
                    <source media="(min-width: 1024px)" srcSet={productDetail.image.desktop.replace('./assets', '/audiophile/images')} />
                    <source media="(min-width: 768px)" srcSet={productDetail.image.tablet.replace('./assets', '/audiophile/images')} />
                    <img src={productDetail.image.mobile.replace('./assets', '/audiophile/images')} />
                </picture>
                <div className={`flex flex-col gap-6  justify-center`}>
                    <span className={`text-preset-2 tracking-[1.125rem] text-primary`}>NEW PRODUCT</span>
                    <h2 className={`text-mobile-4 max-w-[15ch] uppercase xl:text-preset-7`}>{productDetail.name}</h2>
                    <p className={`text-mobile-3 opacity-50 xl:max-w-[48ch]`}>
                        {productDetail.description}
                    </p>
                    <span className={`w-fit text-preset-6`}>{formatCurrency(productDetail.price)}</span>
                    <BasketAdder product={productDetail}  />
                </div>
            </article>

            <article className={`flex max-xl:flex-col w-full xl:justify-between gap-20 px-6 max-w-desktop-page mx-auto xl:px-desktop-gutter text-mobile-3`}>
                <div className={`flex flex-col gap-6`}>
                    <h2 className={`text-mobile-5 xl:text-preset-8`}>FEATURES</h2>
                    <div className={`flex flex-col gap-6 opacity-50 max-w-[68ch]`}>
                        {productDetail.features.split('\n\n').map((feature, index) => (
                            <p key={index}>{feature}</p>
                        ))}
                    </div>
                </div>

                <div className={`flex flex-col gap-6 pr-20`}>
                    <h2 className={`text-mobile-5 xl:text-preset-8`}>IN THE BOX</h2>
                    <dl className={`flex flex-col gap-2 justify-items-start w-fit`}>
                        {productDetail.includes.map((include, index) => (
                            <div key={index} className={`flex items-center gap-6 flex-row-reverse`}>
                                <dt className={`mr-auto opacity-50`}>{include.item}</dt>
                                <dd className={`text-primary`}>{include.quantity}x</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </article>

            <section className={`grid gap-10 xl:grid-areas-[pic1_pic3|pic2_pic3] xl:grid-cols-[max-content_max-content] xl:gap-7 max-w-desktop-content xl:mx-auto mx-6`}>
                <picture className={`xl:grid-area-[pic1]`}>
                    <source media="(min-width: 1024px)" srcSet={productDetail.gallery.first.desktop.replace('./assets', '/audiophile/images')} />
                    <source media="(min-width: 768px)" srcSet={productDetail.gallery.first.tablet.replace('./assets', '/audiophile/images')} />
                    <img src={productDetail.gallery.first.mobile.replace('./assets', '/audiophile/images')} className={`rounded-[8px]`} />
                </picture>
                <picture className={`xl:grid-area-[pic2]`}>
                    <source media="(min-width: 1024px)" srcSet={productDetail.gallery.second.desktop.replace('./assets', '/audiophile/images')} />
                    <source media="(min-width: 768px)" srcSet={productDetail.gallery.second.tablet.replace('./assets', '/audiophile/images')} />
                    <img src={productDetail.gallery.second.mobile.replace('./assets', '/audiophile/images')} className={`rounded-[8px]`} />
                </picture>
                <picture className={`xl:grid-area-[pic3]`}>
                    <source media="(min-width: 1024px)" srcSet={productDetail.gallery.third.desktop.replace('./assets', '/audiophile/images')} />
                    <source media="(min-width: 768px)" srcSet={productDetail.gallery.third.tablet.replace('./assets', '/audiophile/images')} />
                    <img src={productDetail.gallery.third.mobile.replace('./assets', '/audiophile/images')} className={`rounded-[8px]`} />
                </picture>
            </section>

            <article className={`flex flex-col gap-10 items-center max-w-desktop-page xl:mx-auto mx-6 xl:px-desktop-gutter`}>
                <h2 className={`text-mobile-5 uppercase xl:text-preset-8`}>you may also like</h2>
                <div className={`grid xl:grid-cols-3 gap-14 xl:gap-7`}>
                    {productDetail.others.map((other, index) => (
                        <div key={index} className={`flex flex-col gap-8 items-center`}>
                            <picture className={``}>
                                <source media="(min-width: 1024px)" srcSet={other.image.desktop.replace('./assets', '/audiophile/images')} />
                                <source media="(min-width: 768px)" srcSet={other.image.tablet.replace('./assets', '/audiophile/images')} />
                                <img src={other.image.mobile.replace('./assets', '/audiophile/images')} className={`rounded-[8px]`} />
                            </picture>
                            <h3 className={`text-mobile-5 uppercase`}>{other.name}</h3>
                            <button className={`text-white bg-primary py-4 px-6 text-preset-4`}>SEE PRODUCT</button>
                        </div>
                    ))}
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

export default Page;