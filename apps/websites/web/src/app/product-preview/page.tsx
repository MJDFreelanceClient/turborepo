import colors from "@/app/product-preview/@styles/colors.module.css";
import text from "@/app/product-preview/@styles/text.module.css";
import IconCart from "@/app/product-preview/@icons/icon-cart.svg";

const Page = () => {
    return (
        <div className={`min-h-screen bg-background px-4 py-7 ${colors.setup} ${text.setup}`}>
            <article className={`max-w-[343px] md:max-w-[600px] mx-auto flex flex-col-reverse md:flex-row-reverse rounded-[10px] 
                    bg-white overflow-hidden`}>
                <section className={`flex flex-col gap-3 md:gap-5 p-6 md:p-8`}>
                    <div className={`text-preset-1 uppercase text-neutral-500`}>perfume</div>
                    <h1 className={`${text.header} mb-1 text-preset-2 max-w-[18ch] md:max-w-[12ch] text-neutral-700`}>Gabrielle Essence Eau De Parfum</h1>
                    <p className={`mb-1 text-preset-3 text-neutral-500 max-w-[45ch]`}>
                        A floral, solar and voluptuous interpretation composed by Olivier Polge, Perfumer-Creator for the House of CHANEL.
                    </p>
                    <div className={`flex gap-5 items-center my-2`}>
                        <div className={`text-preset-2 text-primary ${text.header}`}>$149.99</div>
                        <div className={`text-preset-4 text-neutral-500`}>$169.99</div>
                    </div>
                    <button className={`text-preset-5 cursor-pointer flex items-center bg-primary hover:bg-neutral-800 
                    text-white py-4 rounded-[8px] justify-center gap-3`}>
                        <IconCart />
                        <span>Add to cart</span>
                    </button>
                </section>
                <div className={`max-md:h-[240px] md:max-w-[300px] w-full overflow-hidden`}>
                    <picture>
                        <source media="(min-width: 1024px)" srcSet="/product-preview/images/image-product-desktop.jpg" />
                        <source media="(min-width: 768px)" srcSet="/product-preview/images/image-product-desktop.jpg" />
                        <img src="/product-preview/images/image-product-mobile.jpg" className={`w-full h-full object-cover object-bottom`} />
                    </picture>
                </div>
            </article>
        </div>
    );
};

export default Page;