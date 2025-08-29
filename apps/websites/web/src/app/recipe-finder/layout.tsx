import {ReactNode} from "react";
import colors from "./@styles/colors.module.css";
import text from "./@styles/text.module.css";
import layout from "./@styles/layout.module.css";
import effects from "./@styles/effects.module.css";

const Layout = ({children}:{children:ReactNode}) => {
    return (
        <div className={`min-h-screen ${text.setup} ${colors.setup} ${layout.setup} ${effects.setup}`}>
            <header className={`grid grid-cols-[1fr_auto_1fr] p-4 md:py-5 md:px-8 xl:px-15`}>
                <a href={`/recipe-finder`}><img src={`/recipe-finder/images/logo.svg`} alt={`Healthy Recipe Finder`} /></a>
                <div className={`grid justify-self-end grid-cols-subgrid col-span-2`}>
                    <button className={`xl:hidden col-span-2 justify-self-end`}><img src={`/recipe-finder/images/icon-hamburger-menu.svg`} /></button>
                    <nav className={`max-xl:hidden max-xl:mt-[40px] max-xl:absolute max-xl:flex max-xl:flex-col xl:grid xl:grid-cols-subgrid justify-between max-xl:justify-self-end items-center col-span-2`}>
                        <div className={`flex max-xl:flex-col gap-10`}>
                            <a href={`/recipe-finder`}>Home</a>
                            <a href={`/recipe-finder/about`}>About</a>
                            <a href={`/recipe-finder/recipes`}>Recipes</a>
                        </div>
                        <a href={`/recipe-finder/recipes`} className={`w-fit justify-self-end flex px-4 py-3 justify-center`}>Browse recipes</a>
                    </nav>
                </div>
            </header>
            {children}
            <footer>

            </footer>
        </div>
    );
};

export default Layout;