import {ReactNode} from "react";
import colors from "./@styles/colors.module.css";
import text from "./@styles/text.module.css";
import layout from "./@styles/layout.module.css";
import effects from "./@styles/effects.module.css";
import IconHamburger from "./@icons/icon-hamburger.svg";

const Layout = ({children}:{children:ReactNode}) => {
    return (
        <div className={`flex flex-col min-h-screen ${text.setup} ${colors.setup} ${layout.setup} ${effects.setup}`}>
            <header className={`flex justify-between items-center`}>
                <img src="/bookmark/images/logo-bookmark.svg" alt="Logo" />
                <div>
                    <IconHamburger className={`xl:hidden`} />
                    <nav className={`flex gap-4 items-center max-xl:hidden`}>
                        <a>Features</a>
                        <a>Pricing</a>
                        <a>Contact</a>
                        <a>Login</a>
                    </nav>
                </div>
            </header>
            {children}
            <footer className={`flex max-md:flex-col bg-blue-950 text-white items-center gap-10 p-10`}>
                <img src="/bookmark/images/logo-bookmark.svg" alt="Logo" />
                <nav className={`flex max-md:flex-col gap-4 items-center`}>
                    <a>Features</a>
                    <a>Pricing</a>
                    <a>Contact</a>
                    <a>Login</a>
                </nav>
                <nav className={`flex gap-4 items-center`}>
                    <img src="/bookmark/images/icon-facebook.svg" alt="Logo" />
                    <img src="/bookmark/images/icon-twitter.svg" alt="Logo" />
                </nav>
            </footer>
        </div>
    );
};

export default Layout;