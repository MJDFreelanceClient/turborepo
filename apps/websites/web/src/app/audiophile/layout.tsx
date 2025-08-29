import text from "@/app/audiophile/@styles/text.module.css";
import colors from "@/app/audiophile/@styles/colors.module.css";
import {ReactNode} from "react";

const Layout = ({children}:{children:ReactNode}) => {
    return (
        <div className={`flex flex-col min-h-screen ${text.setup} ${colors.setup}`}>
            <menu className={`flex w-full justify-between items-center bg-black text-white py-8 px-6 xl:px-desktop-gutter max-w-desktop-page mx-auto`}>
                <img src="/audiophile/images/shared/tablet/icon-hamburger.svg" className={`xl:hidden`} />
                <img src="/audiophile/images/shared/desktop/logo.svg" />
                <nav className={`max-xl:hidden flex gap-4 uppercase text-preset-5`}>
                    <a>Home</a>
                    <a>HEADPHONES</a>
                    <a>SPEAKERSc</a>
                    <a>SPEAKERS</a>
                </nav>
                <img src="/audiophile/images/shared/desktop/icon-cart.svg" />
            </menu>
            {children}
        </div>
    );
};

export default Layout;