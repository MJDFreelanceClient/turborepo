"use client"

import {useEffect, useState} from "react";
import {getCurrentMode, toggleDarkMode} from "@/lib/api/darkMode";
import {useStore} from "@tanstack/react-store";
import {fontStore} from "@/app/dictionary/@api/fontStore";
import { default as MoonIcon } from "@/app/invoices/@icons/icon-moon.svg";
import { default as SunIcon } from "@/app/invoices/@icons/icon-sun.svg";

export const DarkMode = () => {
    const [useDarkMode, setUseDarkMode] = useState(getCurrentMode()==='dark');
    const font = useStore(fontStore);

    useEffect(
        ()=>toggleDarkMode(),
        [useDarkMode]
    )

    return (
        <>
            {useDarkMode && <button onClick={()=>setUseDarkMode(!useDarkMode)}><MoonIcon /></button>}
            {!useDarkMode && <button onClick={()=>setUseDarkMode(!useDarkMode)}><SunIcon /></button>}
        </>
    );
};