"use client"

import {useRouter} from "next/navigation";

export const BackButton = () => {
    const router = useRouter();

    return (
        <button onClick={()=>router.back()} className={`bg-white w-fit outline-1 px-8 dark:bg-blue-800 dark:text-white dark:outline-0`}>
            Back
        </button>
    );
};