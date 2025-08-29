"use client"

import IconMinus from "../@icons/icon-minus.svg";
import IconPlus from "../@icons/icon-plus.svg";
import {useState} from "react";

export const Counter = () => {
    const [count, setCount] = useState(0);

    return (
        <div className={`flex items-center justify-between w-full bg-gray-50 p-4 rounded-[10px] flex-1`}>
            <button onClick={()=>setCount(count=>count-1)}><IconMinus /></button>
            {count}
            <button onClick={()=>setCount(count=>count+1)}><IconPlus /></button>
        </div>
    );
};