"use client"

import {ReactNode} from "react";
import text from "@/app/dictionary/@styles/text.module.css";
import {useStore} from "@tanstack/react-store";
import {fontStore} from "@/app/dictionary/@api/fontStore";

export const FontSettings = ({children}:{children:ReactNode}) => {
    const font = useStore(fontStore);

    return (
        <div className={text.font} data-font={font}>
            {children}
        </div>
    );
};