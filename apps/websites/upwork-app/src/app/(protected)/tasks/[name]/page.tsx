"use client"

import {addTask, getVersionByName} from "@/lib/dynamo";
import {useEffect, useState} from "react";
import {useParams} from "next/navigation";

export default function Page() {
    const [data, setData] = useState<any>(null);
    const { name: taskName } = useParams();

    const saveData = async () => {
        await addTask(data)
    }

    const retrieveData = async () => {
        if (taskName) {
            const data = await getVersionByName(taskName as string);
            setData(data);
        }
    }

    useEffect(()=>{
        retrieveData()
    }, [])

    return (
        <>
            {data && <textarea rows={30} value={data.prompt} onChange={(e)=>
                setData((data:any)=>({...data, prompt:e.target.value}))} className={`w-full h-full`}/>}
            {data && <button onClick={()=>saveData()} className={`cursor-pointer`}>Update Prompt</button>}
        </>
    );
};