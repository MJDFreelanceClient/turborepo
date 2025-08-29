"use server"

import data from "./data.json"
import {getClient} from "dynamo-client";
import {PutCommand} from "@aws-sdk/lib-dynamodb";

const TableName = "fem-qa-movies";

export const getMovies = async () => {
    return data;
}

export const saveMovie = async (Item:any) => {
    const client = await getClient();
    const cmd = new PutCommand({TableName, Item })
    await client.send(cmd)
}