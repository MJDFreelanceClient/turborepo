import {ReactNode} from "react";
import colors from "./@styles/colors.module.css";
import text from "./@styles/text.module.css";
import layout from "./@styles/layout.module.css";
import effects from "./@styles/effects.module.css";
import IconHamburger from "./@icons/icon-hamburger.svg";
import IconFacebook from "./@icons/icon-facebook.svg";
import IconTwitter from "./@icons/icon-twitter.svg";
import IconPinterest from "./@icons/icon-pinterest.svg";
import IconInstagram from "./@icons/icon-instagram.svg";
import {QueryProvider} from "@/app/url-shortener/@components/QueryProvider";

const Layout = ({children}:{children:ReactNode}) => {

    return (
        <div className={`min-h-screen bg-gray-50 ${text.setup} ${colors.setup} ${layout.setup} ${effects.setup}`}>
            <header className={`flex justify-between gap-4 items-center pt-10 px-6 max-w-[1440px] xl:px-[165px] bg-white mx-auto`}>
                <img src="/url-shortener/images/logo.svg" alt="Logo" />
                <div>
                    <IconHamburger className={`md:hidden`} />
                    <nav className={`flex gap-4 items-center max-md:hidden`}>
                        <a>Features</a>
                        <a>Pricing</a>
                        <a>Resources</a>
                        <a className={`md:ml-auto`}>Login</a>
                        <a>Signup</a>
                    </nav>
                </div>
            </header>
            <QueryProvider>
                {children}
            </QueryProvider>
            <footer>
                <img src="/url-shortener/images/logo.svg" alt="Logo" />
                <nav>
                    <section>
                        <h2>Features</h2>
                        <div>
                            <a>Link Shortening</a>
                            <a>Branded Links</a>
                            <a>Branded Links</a>
                        </div>
                    </section>
                    <section>
                        <h2>Resources</h2>
                        <div>
                            <a>Blogc</a>
                            <a>Developers</a>
                            <a>Support</a>
                        </div>
                    </section>
                    <section>
                        <h2>Company</h2>
                        <div>
                            <a>About</a>
                            <a>Our Team</a>
                            <a>Careers</a>
                            <a>Contact</a>
                        </div>
                    </section>
                    <section>
                        <IconFacebook />
                        <IconTwitter />
                        <IconPinterest />
                        <IconInstagram />
                    </section>
                </nav>
            </footer>
        </div>
    );
};

export default Layout;