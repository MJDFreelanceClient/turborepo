import effects from "@/app/recipe-finder/@styles/effects.module.css";

export const RecipeCard = () => {
    return (
        <article className={`flex flex-col gap-4 text-neutral-900 p-2`}>
            <header className={`flex flex-col gap-2.5`}>
                <h2 className={`text-preset-5`}>Mediterranean Chickpea Salad</h2>
                <p className={`text-preset-9 text-neutral-800`}>
                    A refreshing, protein-packed salad tossed in a lemon-olive oil dressing.
                </p>
            </header>
            <ul className={`flex items-center flex-wrap gap-x-4 gap-y-2 text-preset-9`}>
                <li className={`flex items-center gap-1.5 ${effects.servings} ${effects.customMarker} `}>
                    <span>Servings: 2</span>
                </li>
                <li className={`flex items-center gap-1.5 ${effects.prep} ${effects.customMarker} `}>
                    <span>Prep: 10 mins</span>
                </li>
                <li className={`flex items-center gap-1.5 ${effects.cook} ${effects.customMarker} `}>
                    <span>Cook: 0 min</span>
                </li>
            </ul>
            <a className={`flex rounded-full justify-center text-white bg-neutral-900 text-preset-8 py-3 px-8`}>View Recipe</a>
        </article>
    );
};