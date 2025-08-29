import {ReactNode} from "react";
import colors from "./@styles/colors.module.css";
import text from "./@styles/text.module.css";
import layout from "./@styles/layout.module.css";
import effects from "./@styles/effects.module.css";
import IconMenu from "./@icons/icon-menu.svg";
import IconCart from "./@icons/icon-cart.svg";
import IconDelete from "./@icons/icon-delete.svg";

const Layout = ({children}:{children:ReactNode}) => {
    return (
        <div className={`min-h-screen md:gap-12 flex flex-col ${text.setup} ${colors.setup} ${layout.setup} ${effects.setup}`}>
            <header className={`relative border-b-[2px] border-gray-100 flex justify-between items-center max-w-desktop-page xl:px-desktop-gutter px-8 md:px-20 py-6 xl:py-0 max-xl:max-w-[600px] mx-auto w-full`}>
                <div className={`flex max-md:flex-row-reverse items-center gap-4`}>
                    <img src="/sneakers/images/logo.svg" alt="Logo" />
                    <div className={`group`}>
                        <IconMenu className={`md:hidden`} />
                        <nav className={`max-md:text-gray-950 max-md:text-preset-3 flex max-md:gap-6 gap-4 items-center max-md:flex-col max-md:fixed bg-white max-md:hidden max-md:p-24 max-md:left-0 max-md:group-hover:flex max-md:inset-y-0`}>
                            <a className={`w-full xl:pt-6 xl:pb-5 border-b-[4px] hover:border-primary border-transparent cursor-pointer`}>Collections</a>
                            <a className={`w-full xl:pt-6 xl:pb-5 border-b-[4px] hover:border-primary border-transparent cursor-pointer`}>Men</a>
                            <a className={`w-full xl:pt-6 xl:pb-5 border-b-[4px] hover:border-primary border-transparent cursor-pointer`}>Women</a>
                            <a className={`w-full xl:pt-6 xl:pb-5 border-b-[4px] hover:border-primary border-transparent cursor-pointer`}>About</a>
                            <a className={`w-full xl:pt-6 xl:pb-5 border-b-[4px] hover:border-primary border-transparent cursor-pointer`}>Contact</a>
                        </nav>
                    </div>
                </div>

                <div className={`flex items-center gap-6`}>
                    <div className={`group`}>
                        <IconCart />
                        <div className={`overflow-hidden absolute mt-10 max-h-0 inset-x-0 w-full group-hover:max-h-[800px] transition-all delay-500 flex justify-end`}>
                            <div className={`flex flex-col bg-white ml-auto p-6 gap-6 rounded-[10px] ${effects.shadow}`}>
                                <h2>Cart</h2>
                                <hr />
                                <div className={`grid grid-areas-[img_name_del|img_details_del] items-center gap-x-4`}>
                                    <h3 className={`grid-area-[name]`}>Fall Limited Edition Sneakers</h3>
                                    <div className={`grid-area-[details] flex items-center gap-4`}>
                                        <div>$125.00 x 3</div>
                                        <div>$375.00</div>
                                    </div>
                                    <IconDelete className={`grid-area-[del]`} />
                                    <img src="/sneakers/images/image-product-1-thumbnail.jpg" alt="Product" className={`w-[50px] h-[50px] grid-area-[img]`} />
                                </div>
                                <button className={`bg-primary rounded-[10px] w-full py-4`}>Checkout</button>
                            </div>
                        </div>
                    </div>
                    <img src="/sneakers/images/image-avatar.png" alt="Cart" className={`w-6 h-6`} />
                </div>
            </header>
            {children}
        </div>
    );
};

export default Layout;