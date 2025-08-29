"use client"

import {useStore} from "@tanstack/react-store";
import {wordStore} from "@/app/dictionary/@api/wordStore";
import {useDebounce} from "@/app/dictionary/@hooks/useDebounce";

export const Search = () => {
    const word = useStore(wordStore);

    const {debounced, setDebounced} = useDebounce({
        fn: (value: string) => wordStore.setState(value),
        initial: word,
        delay: 500,
    })

    return (
        <input value={debounced} onChange={(e)=>setDebounced(e.target.value)}
               className={`w-full outline-1 px-8 py-4 rounded-[5px] text-gray-400`} placeholder={`Search for a word...`} />
    );
};