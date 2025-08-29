import colors from "@/app/book-club/@styles/colors.module.css";
import text from "@/app/book-club/@styles/text.module.css";

const Page = () => {
    return (
        <div className={`min-h-screen flex flex-col gap-16 md:gap-20 xl:gap-[120px] ${colors.setup} ${text.setup}`}>
            <header className={`xl:max-w-[1440px] pb-20 xl:mx-auto px-4 xl:px-[165px] flex flex-col gap-12 items-start ${colors.grid}`}>
                <img className={`h-9`} src="/book-club/images/logo.svg" />

                <section className={`flex max-xl:flex-col items-center gap-16`}>
                    <div className={`flex flex-col gap-5`}>
                        <h1 className={`md:text-preset-1 text-mobile-1 max-w-[15ch] mb-1 ${text.header}`}>
                            Join the ultimate tech book club</h1>

                        <p className={`text-preset-2`}>
                            Turn your reading time into learning time with fellow tech enthusiasts. Get curated recommendations,
                            join vibrant discussions, and level up your skills one chapter at a time.
                        </p>

                        <a className={`text-preset-3 ${text.header} mt-3 py-5 px-6 border-2 border-neutral-900 rounded-[8px] flex w-fit`}>
                            REVIEW MEMBERSHIP OPTIONS</a>

                        <section className={`grid items-center grid-areas-[avatars_stars|avatars_blurb]`}>
                            <h2 className={`grid-area-[blurb] ${text.header}`}>200+ developers joined already</h2>
                            <div className={`grid-area-[stars] flex`}>
                                <img src="/book-club/images/icon-star.svg" />
                                <img src="/book-club/images/icon-star.svg" />
                                <img src="/book-club/images/icon-star.svg" />
                                <img src="/book-club/images/icon-star.svg" />
                                <img src="/book-club/images/icon-star.svg" />
                            </div>
                            <img className={`grid-area-[avatars]`} src="/book-club/images/image-avatars.webp" />
                        </section>
                    </div>

                    <picture>
                        <source media="(min-width: 1024px)" srcSet="/book-club/images/image-hero-desktop.webp" />
                        <source media="(min-width: 768px)" srcSet="/book-club/images/image-hero-tablet.webp" />
                        <img className={`grid-area-[avatars]`} src="/book-club/images/image-hero-mobile.webp" />
                    </picture>
                </section>
            </header>

            <section className={`flex flex-col px-4 gap-10 xl:flex-row-reverse max-w-[1440px] w-full xl:px-[165px]
                mx-auto justify-between xl:items-center`}>
                <div className={`flex flex-col gap-6 w-fit`}>
                    <h2 className={`text-preset-5  max-md:text-[2.125rem] max-w-[15ch] w-fit ${text.header}`}>
                        Read together, grow together</h2>
                    <ul className={`flex flex-col gap-4 w-fit`}>
                        <li className={`flex items-center gap-4 text-preset-2 w-fit`}>
                            <img src={`/book-club/images/icon-check.svg`} />
                            <span className={` w-fit`}>Monthly curated tech reads selected by industry experts</span>
                        </li>
                        <li className={`flex items-center gap-4 text-preset-2 w-fit`}>
                            <img src={`/book-club/images/icon-check.svg`} />
                            <span className={` w-fit`}>Virtual and in-person meetups for deep-dive discussions</span>
                        </li>
                        <li className={`flex items-center gap-4 text-preset-2 w-fit`}>
                            <img src={`/book-club/images/icon-check.svg`} />
                            <span className={` w-fit`}>Early access to new tech book releases</span>
                        </li>
                        <li className={`flex items-center gap-4 text-preset-2 w-fit`}>
                            <img src={`/book-club/images/icon-check.svg`} />
                            <span className={` w-fit`}>Author Q&A sessions with tech thought leaders</span>
                        </li>
                    </ul>
                </div>
                <picture className={`max-w-[560px]`}>
                    <source media="(min-width: 1024px)" srcSet="/book-club/images/image-read-together-desktop.webp" />
                    <source media="(min-width: 768px)" srcSet="/book-club/images/image-read-together-tablet.webp" />
                    <img className={`grid-area-[avatars]`} src="/book-club/images/image-read-together-mobile.webp" />
                </picture>
            </section>

            <section className={`flex flex-col px-4 gap-10 xl:flex-row max-w-[1440px] w-full xl:px-[165px] mx-auto 
            justify-between xl:items-center`}>
                <div className={`flex flex-col gap-6 max-w-[430px] xl:max-w-[530px] relative`}>
                    <h2 className={`text-preset-5 xl:text-[50px] text-[2rem] max-w-[18ch] ${text.header}`}>
                        Not your average book <span className={`${colors.club}`}>club</span></h2>
                    <p>
                        Connect with a community that speaks your language - from Python to TypeScript and everything in
                        between. Our discussions blend technical depth with practical applications.
                    </p>{/**/}
                </div>
                <div className={`max-w-[560px] relative`}>
                    <img src="/book-club/images/logos-tech.svg" className={`max-md:hidden h-[138px] w-[120px] bottom-6 right-6 absolute xl:left-0 xl:-translate-x-[50%]`} />
                    <picture className={`max-w-[560px]`}>
                        <source media="(min-width: 1024px)" srcSet="/book-club/images/image-not-average-desktop.webp" />
                        <source media="(min-width: 768px)" srcSet="/book-club/images/image-not-average-tablet.webp" />
                        <img className={`grid-area-[avatars]`} src="/book-club/images/image-not-average-mobile.webp" />
                    </picture>
                </div>
            </section>


            <section className={`bg-neutral-50 py-20 max-xl:hidden flex flex-col items-center gap-16 px-15 ${text.header}
                    max-w-[1110px] mx-auto w-full justify-center ${colors.grid}`}>
                <h2 className={`text-preset-5 max-w-[15ch] text-center`}>Your tech reading journey</h2>
                <ul className={`grid grid-cols-4 gap-12 w-full`}>
                    <li className={`flex flex-col gap-2 relative`}>
                        <div className={`text-preset-6 p-3 border w-fit aspect-square flex items-center justify-center`}>1</div>
                        <div className={`text-preset-3 max-w-[15ch]`}>Choose your membership tier</div>
                        <img src="/book-club/images/pattern-arrow.svg" className={`absolute top-0 right-0`} />
                    </li>
                    <li className={`flex flex-col gap-2 relative`}>
                        <div className={`text-preset-6 p-3 border w-fit aspect-square flex items-center justify-center`}>2</div>
                        <div className={`text-preset-3 max-w-[15ch]`}>Get your monthly book selection</div>
                        <img src="/book-club/images/pattern-arrow.svg" className={`absolute top-0 right-0`} />
                    </li>
                    <li className={`flex flex-col gap-2 relative`}>
                        <div className={`text-preset-6 p-3 border w-fit aspect-square flex items-center justify-center`}>3</div>
                        <div className={`text-preset-3 max-w-[18ch]`}>Join our discussion forums</div>
                        <img src="/book-club/images/pattern-arrow.svg" className={`absolute top-0 right-0`} />
                    </li>
                    <li className={`flex flex-col gap-2 relative`}>
                        <div className={`text-preset-6 p-3 border w-fit aspect-square flex items-center justify-center`}>4</div>
                        <div className={`text-preset-3 max-w-[15ch]`}>Attend exclusive meetups</div>
                    </li>
                </ul>
            </section>


            <section className={`flex flex-col gap-6 md:gap-10 xl:gap-16 xl:items-center xl:max-w-[1110px] xl:mx-auto xl:w-full`}>
                <h2 className={`${text.header} text-preset-7 md:text-preset-5 xl:text-center text-neutral-900`}>Membership <br /> Options</h2>
                <ul className={`grid gap-6 md:grid-cols-2 xl:grid-cols-[max-content_auto_max-content] xl:justify-center w-full`}>
                    <li className={`flex flex-col gap-6 items-start p-6 border rounded-[8px] xl:my-4`}>
                        <h3 className={`text-mobile-7 ${text.header}`}>Starter</h3>
                        <dl className={`flex flex-row-reverse items-center gap-2`}>
                           <dt className={`text-preset-2`}>/month</dt>
                            <dd className={`text-preset-7  ${text.header}`}>$19</dd>
                        </dl>
                        <hr className={`text-neutral-200 w-full`} />
                        <ul className={`flex flex-col gap-4 w-fit`}>
                            <li className={`flex items-center gap-4 text-preset-2 w-fit`}>
                                <img src={`/book-club/images/icon-check.svg`} />
                                <span className={` w-fit`}>1 book/month</span>
                            </li>
                            <li className={`flex items-center gap-4 text-preset-2 w-fit`}>
                                <img src={`/book-club/images/icon-check.svg`} />
                                <span className={` w-fit`}>Online forums</span>
                            </li>
                        </ul>
                        <a className={`text-preset-3 ${text.header} bg-pink-50 mt-3 py-5 xl:px-11 border-2 border-neutral-900 rounded-[8px] flex w-full justify-center`}>
                            SUBSCRIBE NOW</a>
                    </li>
                    <li className={`bg-neutral-50 flex flex-col gap-6 items-start p-6 border rounded-[8px] xl:w-[350px] xl:py-10`}>
                        <h3 className={`text-mobile-7 ${text.header}`}>Pro</h3>
                        <dl className={`flex flex-row-reverse items-center gap-2`}>
                            <dt className={`text-preset-2`}>/month</dt>
                            <dd className={`text-preset-7  ${text.header}`}>$29</dd>
                        </dl>
                        <hr className={`text-neutral-200 w-full`} />
                        <ul className={`flex flex-col gap-4 w-fit`}>
                            <li className={`flex items-center gap-4 text-preset-2 w-fit`}>
                                <img src={`/book-club/images/icon-check.svg`} />
                                <span className={` w-fit`}>2 books/month</span>
                            </li>
                            <li className={`flex items-center gap-4 text-preset-2 w-fit`}>
                                <img src={`/book-club/images/icon-check.svg`} />
                                <span className={` w-fit`}>Virtual meetups</span>
                            </li>
                        </ul>
                        <a className={`text-preset-3 ${text.header} bg-pink-50 mt-3 py-5 px-11 border-2 border-neutral-900 rounded-[8px] flex w-full justify-center`}>
                            SUBSCRIBE NOW</a>
                    </li>
                    <li className={`flex flex-col gap-6 items-start p-6 border rounded-[8px] xl:my-4`}>
                        <h3 className={`text-mobile-7 ${text.header}`}>Enterprise</h3>
                        <div className={`flex flex-row-reverse items-center gap-2`}>
                            <div className={`text-preset-7  ${text.header}`}>Custom</div>
                        </div>
                        <hr className={`text-neutral-200 w-full`} />
                        <ul className={`flex flex-col gap-4 w-fit`}>
                            <li className={`flex items-center gap-4 text-preset-2 w-fit`}>
                                <img src={`/book-club/images/icon-check.svg`} />
                                <span className={` w-fit`}>Team access</span>
                            </li>
                            <li className={`flex items-center gap-4 text-preset-2 w-fit`}>
                                <img src={`/book-club/images/icon-check.svg`} />
                                <span className={` w-fit`}>Private sessions</span>
                            </li>
                        </ul>
                        <a className={`text-preset-3 ${text.header} bg-pink-50 px-11 mt-3 py-5 border-2 border-neutral-900 rounded-[8px] flex w-full justify-center`}>
                            SUBSCRIBE NOW</a>
                    </li>
                </ul>
            </section>

            <blockquote className={`flex flex-col gap-8 xl:items-center px-4 max-w-[1110px] xl:mx-auto`}>
                <div className={`grid-area-[stars] flex`}>
                    <img src="/book-club/images/icon-star.svg" />
                    <img src="/book-club/images/icon-star.svg" />
                    <img src="/book-club/images/icon-star.svg" />
                    <img src="/book-club/images/icon-star.svg" />
                    <img src="/book-club/images/icon-star.svg" />
                </div>
                <p className={`text-mobile-7 xl:text-preset-5 xl:text-center max-w-[22ch] xl:max-w-[36ch] ${text.header}`}>
                    &#34;This book club transformed my technical reading from a solitary activity into an enriching community 
                    experience. The discussions are gold!&#34;
                </p>
                <span className={`text-preset-2`}>Sarah Chen, Software Architect</span>
            </blockquote>
        </div>
    );
};

export default Page;