import effects from "@/app/recipe-finder/@styles/effects.module.css";

const Page = () => {
    return (
        <main>
            <header className={`flex flex-col gap-8 xl:gap-20 px-4 md:px-8 pt-12`}>
                <section className={`flex flex-col xl:items-center gap-8 xl:gap-10`}>
                    <div className={`flex items-center flex-col gap-4 xL:gap-6`}>
                        <h1 className={`text-mobile-1 text-neutral-900 md:text-tablet-1 xl:text-desktop-1`}>Healthy meals, zero fuss</h1>
                        <p className={`text-neutral-800 text-preset-6 max-w-[52ch] xl:text-center`}>
                            Discover eight quick, whole-food recipes that you can cook tonight—no processed junk, no guesswork.
                        </p>
                    </div>
                    <a className={`px-8 py-4 rounded-[10px] bg-neutral-900 text-white w-fit`}>Start exploring</a>
                </section>
                <picture>
                    <source srcSet="/recipe-finder/images/image-home-hero-large.webp" media="(min-width: 768px)" />
                    <img src="/recipe-finder/images/image-home-hero-small.webp" className={`rounded-[4px] md:rounded-[8px] xl:rounded-[12px]`} />
                </picture>
            </header>

            <article className={`flex flex-col gap-8 xl:gap-12 pt-16 px-4 md:py-20 md:px-8 xl:py-24`}>
                <h2 className={`text-preset-2 text-neutral-900 text-center`}>What you’ll get</h2>

                <div className={`flex max-xl:flex-col gap-8 `}>
                    <section className={`flex flex-col-reverse gap-6 xl:gap-8`}>
                        <header className={`flex flex-col gap-3`}>
                            <h3 className={`text-preset-3 text-neutral-900`}>Whole-food recipes</h3>
                            <p className={`text-preset-6 text-neutral-800`}>
                                Each dish uses everyday, unprocessed ingredients.
                            </p>
                        </header>
                        <div className={`p-1 flex items-center justify-center rounded-[12px] w-15 h-15 border border-neutral-200 ${effects.usp}`}>
                            <img src="/recipe-finder/images/icon-whole-food-recipes.svg" />
                        </div>
                    </section>

                    <section className={`flex flex-col-reverse gap-6 xl:gap-8`}>
                        <header className={`flex flex-col gap-3`}>
                            <h3 className={`text-preset-3 text-neutral-900`}>Minimum fuss</h3>
                            <p className={`text-preset-6 text-neutral-800`}>
                                All recipes are designed to make eating healthy quick and easy.
                            </p>
                        </header>
                        <div className={`p-1 flex items-center justify-center rounded-[12px] w-15 h-15 border border-neutral-200 ${effects.usp}`}>
                            <img src="/recipe-finder/images/icon-minimum-fuss.svg"  />
                        </div>
                    </section>

                    <section className={`flex flex-col-reverse gap-6 xl:gap-8`}>
                        <header className={`flex flex-col gap-3`}>
                            <h3 className={`text-preset-3 text-neutral-900`}>Search in seconds</h3>
                            <p className={`text-preset-6 text-neutral-800`}>
                                Filter by name or ingredient and jump straight to the recipe you need.
                            </p>
                        </header>
                        <div className={`p-1 flex items-center justify-center rounded-[12px] w-15 h-15 border border-neutral-200 ${effects.usp}`}>
                            <img src="/recipe-finder/images/icon-search-in-seconds.svg" />
                        </div>
                    </section>
                </div>
            </article>

            <article className={`flex max-xl:flex-col gap-8 md:gap-10 xl:gap-12 pt-16 px-4 md:py-20 md:px-8 xl:py-24 items-center`}>
                <div className={`flex flex-col gap-5 text-preset-6 text-neutral-800`}>
                    <h2 className={`text-preset-2 text-neutral-900`}>Built for real life</h2>
                    <p>
                        Cooking shouldn’t be complicated. These recipes come in under 30 minutes of active time, fit busy schedules, and taste good enough to repeat.
                    </p>
                    <p>
                        Whether you’re new to the kitchen or just need fresh ideas, we’ve got you covered.
                    </p>
                </div>
                <picture>
                    <source srcSet="/recipe-finder/images/image-home-real-life-large.webp" media="(min-width: 768px)" />
                    <img src="/recipe-finder/images/image-home-real-life-small.webp" className={`rounded-[4px] md:rounded-[8px] xl:rounded-[12px]`} />
                </picture>
            </article>

            <article className={`bg-neutral-200 flex flex-col items-center gap-8 md:gap-10 px-4 py-12 md:py-20 xl:py-24 rounded-[16px] max-md:mx-4 max-md:mt-16 max-xl:mx-8 max-xl:mt-20`}>
                <header className={`flex flex-col items-center gap-3`}>
                    <h2 className={`text-preset-2 text-neutral-900 text-center`}>Ready to cook smarter?</h2>
                    <p className={`text-preset-6 text-neutral-800 max-w-[25ch] text-center`}>
                        Hit the button, pick a recipe, and get dinner on the table—fast.
                    </p>
                </header>
                <a className={`px-6 py-4 rounded-[10px] bg-neutral-900 text-white`}>Browse recipes</a>
            </article>
        </main>
    );
};

export default Page;