"use client"

import {queryStore, filterStore} from "@/app/rest-flags/@data/searchStore";
import {Select, SelectTrigger, SelectContent, SelectItem} from "@/components/input/Select";
import {useQuery} from "@tanstack/react-query";
import {getCountries} from "@/app/rest-flags/@data/api";
import {uniqueArray} from "@/lib/utils/data/arrays";

export const SearchBar = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['countries'],
        queryFn: getCountries,
    });

    if (isLoading) return <div>Loading...</div>;

    if (isError || !data) return <div>Error...</div>;

    const regions = uniqueArray(data.map((c) => c.region));

    return (
        <menu className={`flex max-md:flex-col justify-between gap-10 z-10`}>
            <input className={`not-dark:outline-1 px-8 py-4 dark:bg-blue-800 rounded-[5px] text-gray-400 dark:text-white`}
                   onChange={(e)=>queryStore.setState(e.target.value)} value={queryStore.state??''}  />
            {/*<input className={`outline-1 w-fit`} onChange={(e)=>filterStore.setState(e.target.value)} value={filterStore.state??''}  />*/}
            <Select value={filterStore.state} onValueChange={(e)=>filterStore.setState(e)}>
                <SelectTrigger> {filterStore.state??"Filter by Region"} </SelectTrigger>
                <SelectContent className={`bg-white`}>
                    {regions.map((region) => (
                        <SelectItem value={region} key={region} >{region}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </menu>
    );
};