import data from "@/app/rest-flags/data.json";
import {cache} from "react";

type Currency = {
    code: string;
    name: string;
    symbol: string;
};

type Language = {
    iso639_1?: string;
    iso639_2?: string;
    name: string;
    nativeName?: string;
};

type RegionalBloc = {
    acronym: string;
    name: string;
    otherAcronyms?: string[];
    otherNames?: string[];
};

type Flags = {
    svg: string;
    png: string;
};

type Translations = {
    br?: string;
    pt?: string;
    nl?: string;
    hr?: string;
    fa?: string;
    de?: string;
    es?: string;
    fr?: string;
    ja?: string;
    it?: string;
    hu?: string;
};

export type Country = {
    name: string;
    topLevelDomain: string[];
    alpha2Code: string;
    alpha3Code: string;
    callingCodes: string[];
    capital?: string;
    altSpellings?: string[];
    subregion: string;
    region: string;
    population: number;
    latlng?: number[];
    demonym: string;
    area?: number;
    gini?: number;
    timezones: string[];
    borders?: string[];
    nativeName: string;
    numericCode: string;
    flags: Flags;
    currencies?: Currency[];
    languages: Language[];
    translations: Translations;
    flag: string;
    regionalBlocs?: RegionalBloc[];
    cioc?: string;
    independent: boolean;
};

export const getCountries: () => Promise<Country[]> = cache(async () => {
    return data;
})