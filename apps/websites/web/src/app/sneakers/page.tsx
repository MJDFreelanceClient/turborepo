import {Counter} from "@/app/sneakers/@components/Counter";
import IconCart from "./@icons/icon-cart.svg";

const Page = () => {
    return (
        <main className={`flex flex-col-reverse xl:flex-row-reverse items-center gap-6 max-w-desktop-page xl:px-desktop-gutter md:gap-12 max-xl:max-w-[600px] mx-auto w-full`}>
            <div className={`flex flex-col gap-8 md:gap-6 px-8 md:max-xl:px-20 xl:pl-40 xl:pr-0`}>
                <header className={`flex flex-col gap-4 md:gap-6`}>
                    <span className={`text-mobile-1 md:text-tablet-3 text-gray-500 uppercase`}>Sneaker Company</span>
                    <h1 className={`text-preset-2 md:text-preset-1 text-gray-950`}>Fall Limited Edition Sneakers</h1>
                    <p className={`text-preset-6 text-gray-500`}>
                        These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer
                        sole, they’ll withstand everything the weather can offer.
                    </p>
                </header>
                <div className={`flex flex-wrap items-center gap-4 gap-y-2`}>
                    <span className={`text-preset-2 text-gray-950`}>$125.00</span>
                    <span className={`px-2.5 bg-gray-950 text-white rounded-[6px] text-preset-4`}>50%</span>
                    <span className={`ml-auto text-preset-3 line-through text-gray-500 md:w-full`}>$250.00</span>
                </div>
                <div className={`flex max-md:flex-col gap-4 text-preset-4 text-gray-950`}>
                    <Counter />
                    <button className={`flex items-center justify-center gap-y-4 gap-x-2 py-4 bg-primary rounded-[10px] flex-1`}>
                        <IconCart className={`!fill-gray-950`} />
                        Add to Basket
                    </button>
                </div>
            </div>
            <img src="/sneakers/images/image-product-1.jpg" className={`md:max-xl:px-20 xl:max-w-[440px] xl:w-full`} />
        </main>
    );
};

export default Page;