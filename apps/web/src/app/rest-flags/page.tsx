"use client"

import {getCountries} from "@/app/rest-flags/@data/api";
import {useQuery} from "@tanstack/react-query";
import {queryStore, filterStore} from "@/app/rest-flags/@data/searchStore";
import {useStore} from "@tanstack/react-store";
import {useFuse} from "@/app/rest-flags/@data/useFuse";
import {useEffect} from "react";
import {Country} from "@/app/rest-flags/@data/api";
import {SearchBar} from "@/app/rest-flags/components/SearchBar";
import colors from "@/app/rest-flags/styles/colors.module.css";

const filters = (value:any) => ({
    region: (a:any) => a.region.toLowerCase() === value.toLowerCase()
})

const Page = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['countries'],
        queryFn: getCountries,
    });

    const query = useStore(queryStore);
    const filter = useStore(filterStore);

    const {updateData, search, results:countries} = useFuse<Country>({
        data: data ?? [],
        keys: ["name"],
    });

    useEffect(() => {
        if (!data) return;

        updateData( filter ? data.filter(filters(filter).region) : data );
    }, [data, filter, updateData]);

    useEffect(() => { search(query??'') }, [query, search]);


    if (isLoading) return <div>Loading...</div>;

    if (isError || !data) return <div>Error...</div>;

    return (
        <>
            <SearchBar />
            <div className={`grid md:grid-cols-2 xl:grid-cols-4 gap-18`}>
                {countries?.map(({item: country}) => (
                    <a href={`/rest-flags/${encodeURIComponent(country.name)}`}  key={country?.name} className={`bg-white flex flex-col dark:bg-blue-800 ${colors.shadow}`}>
                        <img src={country?.flags.svg} className={`w-full`} />
                        <section className={`flex flex-col gap-4 py-5.5 px-6 text-gray-900 text-preset-3 mt-auto dark:text-white`}>
                            {country?.name}
                            <dl className={`flex flex-col gap-2 text-preset-6 font-semibold`}>
                                <div className={`flex gap-[1ch]`}>
                                    <dt>Population</dt>
                                    <dd className={`font-light`}>{country?.population}</dd>
                                </div>
                                <div className={`flex gap-[1ch]`}>
                                    <dt>Region</dt>
                                    <dd className={`font-light`}>{country?.region}</dd>
                                </div>
                                <div className={`flex gap-[1ch]`}>
                                    <dt>Capital</dt>
                                    <dd className={`font-light`}>{country?.capital}</dd>
                                </div>
                            </dl>
                        </section>
                    </a>
                ))}
            </div>
        </>
    );
};

export default Page;