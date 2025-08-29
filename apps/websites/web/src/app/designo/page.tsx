export const Page = () => {
    return (
        <main className={`flex-1 flex flex-col items-center gap-32 xl:gap-40 pb-40 max-w-desktop-content mx-auto`}>
            <section className={`grid xl:grid-areas-[art1_art2|art1_art3] gap-x-7.5 gap-y-6`}>
                <article className={`group xl:grid-area-[art1] grid grid-areas-[content]`}>
                    <picture className={` grid-area-[content]`}>
                        <source media="(min-width: 1024px)" srcSet="/designo/images/home/desktop/image-web-design-large.jpg" />
                        <source media="(min-width: 768px)" srcSet="/designo/images/home/tablet/image-web-design.jpg" />
                        <img src="/designo/images/home/mobile/image-web-design.jpg" className={`rounded-[15px]`} />
                    </picture>
                    <div className={`flex flex-col gap-4 items-center justify-center grid-area-[content] z-10 text-white`}>
                        <h2>WEB DESIGN</h2>
                        <div>VIEW PROJECTS</div>
                    </div>
                    <div className={`grid grid-area-[content] bg-black opacity-20 group-hover:bg-primary`}>

                    </div>
                </article>
                <article className={`grid xl:grid-area-[art2] grid-areas-[content]`}>
                    <picture className={` grid-area-[content]`}>
                        <source media="(min-width: 1024px)" srcSet="/designo/images/home/desktop/image-app-design.jpg" />
                        <source media="(min-width: 768px)" srcSet="/designo/images/home/tablet/image-app-design.jpg" />
                        <img src="/designo/images/home/mobile/image-app-design.jpg" className={`rounded-[15px]`} />
                    </picture>
                    <div className={`flex flex-col gap-4 items-center justify-center grid-area-[content] z-10 text-white`}>
                        <h2>WEB DESIGN</h2>
                        <div>VIEW PROJECTS</div>
                    </div>
                </article>
                <article className={`grid xl:grid-area-[art3] grid-areas-[content]`}>
                    <picture className={` grid-area-[content]`}>
                        <source media="(min-width: 1024px)" srcSet="/designo/images/home/desktop/image-graphic-design.jpg" />
                        <source media="(min-width: 768px)" srcSet="/designo/images/home/tablet/image-graphic-design.jpg" />
                        <img src="/designo/images/home/mobile/image-graphic-design.jpg"  className={`rounded-[15px]`}/>
                    </picture>
                    <div className={`flex flex-col gap-4 items-center justify-center grid-area-[content] z-10 text-white`}>
                        <h2>WEB DESIGN</h2>
                        <div>VIEW PROJECTS</div>
                    </div>
                </article>
            </section>

            <article className={`grid xl:grid-cols-3 w-full gap-7.5`}>
                <div className={`flex md:max-xl:flex-row flex-col-reverse gap-8 items-center justify-center text-center`}>
                    <header className={`flex flex-col gap-8`}>
                        <h2>PASSIONATE</h2>
                        <p>
                            Each project starts with an in-depth brand research to ensure we only create products that
                            serve a purpose. We merge art, design, and technology into exciting new solutions.
                        </p>
                    </header>
                    <img src="/designo/images/home/desktop/illustration-passionate.svg"/>
                </div>
                <div className={`flex md:max-xl:flex-row flex-col-reverse gap-8 items-center justify-center text-center`}>
                    <header className={`flex flex-col gap-8`}>
                        <h2>RESOURCEFUL</h2>
                        <p>
                            Everything that we do has a strategic purpose. We use an agile approach in all of our projects
                            and value customer collaboration. It guarantees superior results that fulfill our clients’ needs.
                        </p>
                    </header>
                    <img src="/designo/images/home/desktop/illustration-resourceful.svg"/>
                </div>
                <div className={`flex md:max-xl:flex-row flex-col-reverse gap-8 items-center justify-center text-center`}>
                    <header className={`flex flex-col gap-8`}>
                        <h2>FRIENDLY</h2>
                        <p>
                            We are a group of enthusiastic folks who know how to put people first. Our success depends on
                            our customers, and we strive to give them the best experience a company can provide.
                        </p>
                    </header>
                    <img src="/designo/images/home/desktop/illustration-friendly.svg"/>
                </div>
            </article>
        </main>
    );
};

export default Page;