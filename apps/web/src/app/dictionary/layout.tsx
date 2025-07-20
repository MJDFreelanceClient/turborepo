import {ReactNode} from "react";
import {QueryWrapper} from "@/app/dictionary/@components/QueryWrapper";
import {Search} from "@/app/dictionary/@components/Search";
import {Options} from "@/app/dictionary/@components/Options";
import {FontSettings} from "@/app/dictionary/@components/FontSettings";
import colors from "@/app/dictionary/@styles/colors.module.css";
import text from "@/app/dictionary/@styles/text.module.css";

const Layout = (({children}:{children:ReactNode}) => {
    return (
        <div className={`${text.setup} ${colors.setup} min-h-screen flex flex-col`}>
            <QueryWrapper>
                <FontSettings>
                    <Options />
                    <Search />
                    {children}
                </FontSettings>
            </QueryWrapper>
        </div>
    );
});

export default Layout;