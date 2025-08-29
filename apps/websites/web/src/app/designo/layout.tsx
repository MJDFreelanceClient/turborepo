import {ReactNode} from "react";
import colors from "@/app/designo/@styles/colors.module.css";
import text from "@/app/designo/@styles/text.module.css";
import IconHamburger from "@/app/designo/@icons/icon-hamburger.svg";

const Layout = ({children}:{children:ReactNode}) => {
    return (
        <div className={`flex flex-col min-h-screen ${text.setup} ${colors.setup}`}>
            <header className={`flex justify-between items-center px-6 py-9 text-preset-1 text-neutral-800 max-w-desktop-content mx-auto w-full`}>
                <img src="/designo/images/shared/desktop/logo-dark.png" className={`w-[202px]`} />
                <IconHamburger className={`h-5 w-6 xl:hidden`}/>
                <nav className={`max-xl:hidden flex gap-4`}>
                    <a>OUR COMPANY</a>
                    <a>LOCATIONS</a>
                    <a>CONTACT</a>
                </nav>
            </header>
            {children}
            <footer className={`text-white mt-auto`}>
                <div className={`bg-neutral-950`}>
                    <div className={`max-w-desktop-content xl:mx-auto xl:py-18 xl:px-24
                px-6 py-9 bg-primary flex max-xl:flex-col items-center max-xl:justify-center xl:justify-between gap-8 mx-6 rounded-[1rem]`}>
                        <header className={`flex flex-col gap-1.5 max-xl:text-center max-xl:items-center`}>
                            <h2 className={`text-mobile-2 xl:text-preset-2 max-w-[13ch]`}>Let&#39;s talk about your project</h2>
                            <p className={`max-w-[32ch] xl:max-w-[45ch]`}>
                                Ready to take it to the next level? Contact us today and find out how our expertise can help your
                                business grow.
                            </p>
                        </header>
                        <button className={`text-mobile-3 xl:text-preset-3 bg-white text-neutral-800 p-4 rounded-[8px]`}>GET IN TOUCH</button>
                    </div>
                </div>
                <div className={`bg-neutral-950 text-white grid items-center `}>
                    <div className={`bg-neutral-950 text-white grid items-center max-xl:justify-items-center max-w-desktop-content mx-auto w-full
                        xl:grid-areas-[logo_links_links|hr_hr_hr|add1_add2_social] gap-y-8 md:gap-y-10 py-18 max-md:px-6`}>
                        <img src="/designo/images/shared/desktop/logo-light.png" className={`w-[202px] xl:grid-area-[logo]`} />
                        <hr className={`xl:grid-area-[hr] w-full opacity-10`} />
                        <nav className={`xl:grid-area-[links] flex gap-8 xl:justify-self-end max-xl:flex-col xl:gap-10 text-center`}>
                            <a>OUR COMPANY</a>
                            <a>LOCATIONS</a>
                            <a>CONTACT</a>
                        </nav>
                        <address className={`not-italic xl:grid-area-[add1] max-xl:text-center max-md:my-2 opacity-50`}>
                            <h2>Designo Central Office</h2>
                            <div>3886 Wellington Street</div>
                            <div>Toronto, Ontario M9C 3J5</div>
                        </address>
                        <address className={`not-italic xl:grid-area-[add2] max-xl:text-center max-md:mb-2 opacity-50`}>
                            <h2>Contact Us (Central Office)</h2>
                            <div>P : +1 253-863-8967</div>
                            <div>M : contact@designo.co</div>
                        </address>
                        <div className={`social flex gap-4 xl:justify-self-end xl:self-end`}>
                            <img src="/designo/images/shared/desktop/icon-facebook.svg" className={`xl:grid-area-[logo]`} />
                            <img src="/designo/images/shared/desktop/icon-youtube.svg" className={`xl:grid-area-[logo]`} />
                            <img src="/designo/images/shared/desktop/icon-twitter.svg" className={`xl:grid-area-[logo]`} />
                            <img src="/designo/images/shared/desktop/icon-pinterest.svg" className={`xl:grid-area-[logo]`} />
                            <img src="/designo/images/shared/desktop/icon-instagram.svg" className={`xl:grid-area-[logo]`} />
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Layout;