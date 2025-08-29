import effects from "@/app/recipe-finder/@styles/effects.module.css";

const Page = () => {
    return (
        <main>
            <header className={`flex max-xl:flex-col gap-10 md:gap-16 pt-16 px-4 md:py-20 md:px-8 xl:py-24 items-center`}>
                <section className={`flex flex-col gap-6`}>
                    <div className={`text-preset-5 text-neutral-900`}>Our mission</div>
                    <h1 className={`text-preset-2 text-neutral-900`}>Help more people cook nourishing meals, more often.</h1>
                    <div className={`fle flex-col gap-4 text-preset-6 text-neutral-800`}>
                        <p>
                            Healthy Recipe Finder was created to prove that healthy eating can be convenient, affordable, and genuinely delicious.
                        </p>
                        <p>
                            We showcase quick, whole-food dishes that anyone can master—no fancy equipment, no ultra-processed shortcuts—just
                            honest ingredients and straightforward steps.
                        </p>
                    </div>
                </section>
                <picture>
                    <source srcSet="/recipe-finder/images/image-about-our-mission-large.webp" media="(min-width: 768px)" />
                    <img src="/recipe-finder/images/image-about-our-mission-small.webp" className={`rounded-[4px] md:rounded-[8px] xl:rounded-[12px]`} />
                </picture>
            </header>

            <article className={`grid xl:grid-cols-[auto_1fr] py-12 px-4 md:py-20 md:px-8 xl:py-24 gap-10 xl:gap-20`}>
                <h2 className={`text-preset-2 text-neutral-900 xl:min-w-[372px]`}>Why we exist</h2>

                <ul className={`flex flex-col gap-6 md:gap-8 xl:gap-12`}>
                    <li className={`grid grid-cols-[auto_1fr] gap-5 ${effects.customMarkerLarge} ${effects.exist} !before:w-8 !before:h-8` }>
                        <div className={`flex flex-col gap-3`}>
                            <h3 className={`text-preset-4 text-neutral-900 flex-nowrap text-nowrap`}>Cut through the noise.</h3>
                            <p className={`text-preset-6 text-neutral-800`}>
                                The internet is bursting with recipes, yet most busy cooks still default to take-away or packaged foods.
                                We curate a tight collection of fool-proof dishes so you can skip the scrolling and start cooking.
                            </p>
                        </div>
                    </li>
                    <li className={`grid grid-cols-[auto_1fr] gap-5 ${effects.customMarkerLarge} ${effects.exist} !before:w-8 !before:h-8` }>
                        <div className={`flex flex-col gap-3`}>
                            <h3 className={`text-preset-4 text-neutral-900 flex-nowrap text-nowrap`}>Empower home kitchens.</h3>
                            <p className={`text-preset-6 text-neutral-800`}>
                                When you control what goes into your meals, you control how you feel. Every recipe is built
                                around unrefined ingredients and ready in about half an hour of active prep.
                            </p>
                        </div>
                    </li>
                    <li className={`grid grid-cols-[auto_1fr] gap-5 ${effects.customMarkerLarge} ${effects.exist} !before:w-8 !before:h-8` }>
                        <div className={`flex flex-col gap-3`}>
                            <h3 className={`text-preset-4 text-neutral-900 flex-nowrap text-nowrap`}>Make healthy look good.</h3>
                            <p className={`text-preset-6 text-neutral-800`}>
                                High-resolution imagery shows you exactly what success looks like—because we eat with our eyes
                                first, and confidence matters.
                            </p>
                        </div>
                    </li>
                </ul>
            </article>

            <article className={`grid xl:grid-cols-[auto_1fr] py-12 px-4 md:py-20 md:px-8 xl:py-24 gap-10 xl:gap-20`}>
                <h2 className={`text-preset-2 text-neutral-900 xl:w-[372px]`}>Our food philosophy</h2>

                <ul className={`flex flex-col gap-6 md:gap-8 xl:gap-12`}>
                    <li className={`grid grid-cols-[auto_1fr] gap-5 ${effects.customMarkerLarge} ${effects.exist} !before:w-8 !before:h-8` }>
                        <div className={`flex flex-col gap-3`}>
                            <h3 className={`text-preset-4 text-neutral-900 flex-nowrap text-nowrap`}>Whole ingredients first.</h3>
                            <p className={`text-preset-6 text-neutral-800`}>
                                Fresh produce, grains, legumes, herbs, and quality fats form the backbone of every recipe.
                            </p>
                        </div>
                    </li>
                    <li className={`grid grid-cols-[auto_1fr] gap-5 ${effects.customMarkerLarge} ${effects.exist} !before:w-8 !before:h-8` }>
                        <div className={`flex flex-col gap-3`}>
                            <h3 className={`text-preset-4 text-neutral-900 flex-nowrap text-nowrap`}>Flavor without compromise.</h3>
                            <p className={`text-preset-6 text-neutral-800`}>
                                Spices, citrus, and natural sweetness replace excess salt, sugar, and additives.
                            </p>
                        </div>
                    </li>
                    <li className={`grid grid-cols-[auto_1fr] gap-5 ${effects.customMarkerLarge} ${effects.exist} !before:w-8 !before:h-8` }>
                        <div className={`flex flex-col gap-3`}>
                            <h3 className={`text-preset-4 text-neutral-900 flex-nowrap text-nowrap`}>Respect for time.</h3>
                            <p className={`text-preset-6 text-neutral-800`}>
                                Weeknight meals should slot into real schedules; weekend cooking can be leisurely but never wasteful.
                            </p>
                        </div>
                    </li>
                    <li className={`grid grid-cols-[auto_1fr] gap-5 ${effects.customMarkerLarge} ${effects.exist} !before:w-8 !before:h-8` }>
                        <div className={`flex flex-col gap-3`}>
                            <h3 className={`text-preset-4 text-neutral-900 flex-nowrap text-nowrap`}>Sustainable choices.</h3>
                            <p className={`text-preset-6 text-neutral-800`}>
                                Short ingredient lists cut down on food waste and carbon footprint, while plant-forward dishes keep things planet-friendly.
                            </p>
                        </div>
                    </li>
                </ul>
            </article>

            <article className={`flex max-xl:flex-col gap-8 md:gap-10 xl:gap-12 pt-16 px-4 md:py-20 md:px-8 xl:py-24 items-center`}>
                <div className={`flex flex-col gap-3 text-preset-6 text-neutral-800`}>
                    <h2 className={`text-preset-2 text-neutral-900 mb-2`}>Beyond the plate</h2>
                    <p>
                        We believe food is a catalyst for community and well-being. By sharing approachable recipes, we hope to:
                    </p>
                    <ul className={`list-disc pl-6`}>
                       <li> Encourage family dinners and social cooking. </li>
                        <li> Reduce reliance on single-use packaging and delivery waste. </li>
                        <li> Spark curiosity about seasonal produce and local agriculture. </li>
                    </ul>
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