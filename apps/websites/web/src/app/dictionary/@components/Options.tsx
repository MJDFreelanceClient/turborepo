"use client"

import {useEffect, useState} from "react";
import {getCurrentMode, toggleDarkMode} from "@/lib/api/darkMode";
import {Switch} from "@/components/input/Switch";
import {Select, SelectTrigger, SelectItem, SelectContent} from "@/components/input/Select";
import {useStore} from "@tanstack/react-store";
import {fontStore} from "@/app/dictionary/@api/fontStore";

export const Options = () => {
    const [useDarkMode, setUseDarkMode] = useState(getCurrentMode()==='dark');
    const font = useStore(fontStore);

    useEffect(
        ()=>toggleDarkMode(),
        [useDarkMode]
    )

    return (
        <>
            <Switch onCheckedChange={()=>setUseDarkMode(!useDarkMode)} checked={useDarkMode} />
            <Select value={font} onValueChange={(value)=>fontStore.setState(value as any)}>
                <SelectTrigger>{font || 'Font'}</SelectTrigger>
                <SelectContent>
                    <SelectItem value={`sans`}>Sans</SelectItem>
                    <SelectItem value={`serif`}>Serif</SelectItem>
                    <SelectItem value={`monospace`}>Mono</SelectItem>
                </SelectContent>
            </Select>
        </>
    );
};