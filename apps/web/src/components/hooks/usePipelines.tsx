import {useState} from "react";

export const UsePipeline = ({data}:{data:T[]}) => {
    const pipeline = {
        data: useState(data),
        filterBy: ()=>{

        },
        sortBy: ()=>{},
    }

    return {pipeline}
};