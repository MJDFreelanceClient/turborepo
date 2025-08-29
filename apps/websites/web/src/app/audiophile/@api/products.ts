"use server"

import data from "./data.json";
import {Product} from "@/app/audiophile/@api/types";

export const getProducts = async () => {
    return data??[] as Product[];
}

export const getProduct = async (id: string) => {
    return data.find(product => product.slug === id) as Product|undefined;
}