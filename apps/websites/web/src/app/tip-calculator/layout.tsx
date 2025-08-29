import {ReactNode} from "react";
import colors from "./@styles/colors.module.css";
import text from "./@styles/text.module.css";
import layout from "./@styles/layout.module.css";

const Layout = ({children}:{children:ReactNode}) => {
    return (
        <div className={`min-h-screen flex flex-col items-center pt-2 bg-gray-200 ${text.setup} ${colors.setup} ${layout.setup}`}>
            <img src="/tip-calculator/images/logo.svg" className={`my-10`} alt={``} />
            {children}
        </div>
    );
};

export default Layout;