"use server"

import data from "@/app/product-feedback/@api/data.json";

const getRequest = async (id: string | number) => {
    return data.productRequests.find(request => request.id.toString() === id.toString())??{unset:true};
}

const getRequests = async () => {
    return data.productRequests;
}

const createRequest = async () => {
    console.error("Not implemented");
}

const deleteRequest = async () => {
    console.error("Not implemented");
}

export {
    getRequest,
    getRequests,
    createRequest,
    deleteRequest,
}