"use client"

import {getCountries} from "@/app/rest-flags/@data/api";
import {useQuery} from "@tanstack/react-query";
import { useParams } from 'next/navigation'
import {BackButton} from "@/app/rest-flags/components/BackButton";

const Page = () => {
    const {countryName} = useParams()

    const { data, isLoading, isError } = useQuery({
        queryKey: ['countries'],
        queryFn: getCountries,
        select: (data) => data.find((c) => c.name === decodeURIComponent(countryName?.toString()??'') || c.alpha3Code === decodeURIComponent(countryName?.toString()??'')) ?? null,
    });

    if (isLoading) return <div>Loading...</div>;

    if (isError || !data) return <div>Error...</div>;

    const country = data;

    return (
        <div className={`flex flex-col gap-15`}>
            <BackButton />
            <article key={country?.name} className={`flex justify-between md:items-center w-full max-xl:flex-col max-xl:gap-14`}>
                <img src={country?.flags.svg} className={`w-full flex-1 max-w-[600px] w-full`} />
                <section className={`flex-1 max-w-[600px] w-fit flex flex-col gap-6 dark:text-white max-md:gap-8`}>
                    <h1 className={`text-preset-1`}>{country?.name}</h1>
                    <div className={`flex w-full justify-between max-md:flex-col max-md:gap-8`}>
                        <dl className={`flex flex-col gap-2 text-preset-6 font-semibold`}>
                            <div className={`flex gap-[1ch]`}>
                                <dt>Native Name:</dt>
                                <dd className={`font-light`}>{country?.population}</dd>
                            </div>
                            <div className={`flex gap-[1ch]`}>
                                <dt>Population:</dt>
                                <dd className={`font-light`}>{country?.region}</dd>
                            </div>
                            <div className={`flex gap-[1ch]`}>
                                <dt>Region:</dt>
                                <dd className={`font-light`}>{country?.capital}</dd>
                            </div>
                            <div className={`flex gap-[1ch]`}>
                                <dt>Sub Region:</dt>
                                <dd className={`font-light`}>{country?.region}</dd>
                            </div>
                            <div className={`flex gap-[1ch]`}>
                                <dt>Capital:</dt>
                                <dd className={`font-light`}>{country?.capital}</dd>
                            </div>
                        </dl>
                        <dl className={`flex flex-col gap-2 text-preset-6 font-semibold`}>
                            <div className={`flex gap-[1ch]`}>
                                <dt>Top Level Domain:c</dt>
                                <dd className={`font-light`}>{country?.region}</dd>
                            </div>
                            <div className={`flex gap-[1ch]`}>
                                <dt>Currencies:</dt>
                                <dd className={`font-light`}>{country?.capital}</dd>
                            </div>
                            <div className={`flex gap-[1ch]`}>
                                <dt>Languages:</dt>
                                <dd className={`font-light`}>{country?.capital}</dd>
                            </div>
                        </dl>
                    </div>
                    <dl className={`flex gap-4 md:items-center md:mt-10 max-md:flex-col`}>
                        <dt className={`text-nowrap`}>Border Countries:</dt>
                        <dd>
                            <ul className={`flex flex-wrap gap-4 md:items-center w-full`}>
                                {country?.borders?.map((border) => (
                                    <li key={border}>
                                        <a href={`/rest-flags/${border}`} className={`px-7 border-1 border-gray-300`}>
                                            {border}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </dd>
                    </dl>
                </section>
            </article>
        </div>
    );
};

export default Page;