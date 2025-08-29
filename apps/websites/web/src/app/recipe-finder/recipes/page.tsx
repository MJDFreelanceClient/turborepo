import effects from "@/app/recipe-finder/@styles/effects.module.css";

const Page = () => {
    return (
        <main>
            <header className={`flex flex-col gap-3 xL:gap-6 px-4 py-12 md:px-8 md:py-16 xl:py-16 xl:items-center`}>
                <h1 className={`text-preset-2 text-neutral-900`}>Explore our simple, healthy recipes</h1>
                <p className={`text-neutral-800 text-preset-10 font-normal max-w-[60ch] xl:text-center`}>
                    Discover eight quick, whole-food dishes that fit real-life schedules and taste amazing. Use the search
                    bar to find a recipe by name or ingredient, or simply scroll the list and let something delicious catch your eye.
                </p>
            </header>
        </main>
    );
};

export default Page;