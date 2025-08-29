import {ReactNode} from "react";
import colors from "./@styles/colors.module.css";
import text from "./@styles/text.module.css";
import layout from "./@styles/layout.module.css";
import effects from "./@styles/effects.module.css";

const Layout = ({children}:{children:ReactNode}) => {
    return (
        <div className={`min-h-screen px-4 py-8 md:px-10 md:py-13 mx-auto bg-neutral-100 ${text.setup} ${colors.setup} ${layout.setup} ${effects.setup}`}>
            {children}
        </div>
    );
};

export default Layout;