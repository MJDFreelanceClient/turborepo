import {ReactNode} from "react";
import colors from "./@styles/colors.module.css";
import text from "./@styles/text.module.css";
import layout from "./@styles/layout.module.css";
import effects from "./@styles/effects.module.css";

const Layout = ({children}:{children:ReactNode}) => {
    return (
        <div className={`flex flex-col gap-12 min-h-screen bg-navy-900 text-white px-5 py-4 ${text.setup} ${colors.setup} ${layout.setup} ${effects.setup}`}>
            <header className={`flex justify-between items-center`}>
                <img src="/fylo-dark/logo.svg" alt="Fylo logo" className={`w-20`} />
                <nav className={`flex gap-6 text-preset-5 `}>
                    <a>Features</a>
                    <a>Team</a>
                    <a>Sign In</a>
                </nav>
            </header>
            {children}
        </div>
    );
};

export default Layout;