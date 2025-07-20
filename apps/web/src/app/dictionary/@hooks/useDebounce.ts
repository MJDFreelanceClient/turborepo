import {useEffect, useState} from "react";

export const useDebounce = ({fn, initial, delay=500}:{fn:any, initial:any, delay:number}) => {
    const [debounced, setDebounced] = useState(initial);

    useEffect(()=>{
        const timer = setTimeout(()=>{
            fn(debounced);
        }, delay);
        return ()=>{
            clearTimeout(timer);
        }
    }, [debounced, delay, fn])

    return {debounced, setDebounced};
};