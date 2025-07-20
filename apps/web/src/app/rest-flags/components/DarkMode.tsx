"use client"

import {toggleDarkMode} from "@/lib/api/darkMode";

export const DarkMode = () => {
    return (
        <button onClick={()=>toggleDarkMode()} className={`text-preset-6 xl:text-preset-4 text-gray-900 font-semibold dark:text-white`}>Dark Mode</button>
    );
};