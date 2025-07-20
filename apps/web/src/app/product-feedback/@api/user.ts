"use server"

import data from "@/app/product-feedback/@api/data.json";

const getUser = async () => {
    return data.productRequests[0];
}

const getUsers = async () => {
    return data.productRequests;
}

const createUser = async () => {
    console.error("Not implemented");
}

const deleteUser = async () => {
    console.error("Not implemented");
}

export {
    getUser,
    getUsers,
    createUser,
    deleteUser
}