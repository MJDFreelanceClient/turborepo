"use server"

import data from "./data.json";
import {DeleteCommand, DynamoDBDocumentClient, GetCommand, PutCommand, ScanCommand} from "@aws-sdk/lib-dynamodb";
import {DynamoDBClient} from "@aws-sdk/client-dynamodb";
import {fromWebToken} from "@aws-sdk/credential-providers";
import {Invoice} from "@/app/invoices/@api/types";
import {cache} from "react";

export const getClient = async () => {

    const region = process.env.AWS_REGION!;
    const roleArn = process.env.AWS_ROLE_ARN!;
    const token = process.env.VERCEL_OIDC_TOKEN!;

    const baseClient = new DynamoDBClient({
        region,
        credentials: fromWebToken({
            roleArn,
            webIdentityToken: token,
            roleSessionName: 'vercel-session',
        }),
    });

    console.log(baseClient)

// Create the lib-dynamodb wrapper
    return DynamoDBDocumentClient.from(baseClient);
}

export const getInvoicesFile: () => Promise<Invoice[]> = async () => {
    return data as Invoice[];
}

export const getInvoices: () => Promise<Invoice[]> = cache(async () => {
    console.time("getInvoices:scan");
    console.log("getInvoices");
    const client = await getClient();
    const cmd = new ScanCommand({ TableName: "fem-dev-invoices" });
    const res = await client.send(cmd);
    console.timeEnd("getInvoices:scan");
    return res.Items as Invoice[] ?? [];
})

export const createInvoice = async (invoice: Invoice) => {
    const client = await getClient();
    const cmd = new PutCommand({
        TableName: "fem-dev-invoices",
        Item: invoice
    });
    const response = await client.send(cmd);
    console.log("response", response);
};

export const getInvoice = cache(async (id: string) => {
    //console.time("getInvoice:query");
    const client = await getClient();
    const cmd = new GetCommand({
        TableName: "fem-dev-invoices",
        Key: { id },
    });
    const start = performance.now();
    const res = await client.send(cmd);
    const end = performance.now();
    //console.timeEnd("getInvoice:query");
    console.log(`That took ${(end - start).toFixed(2)}ms`);
    return res.Item;
});

export const deleteInvoice = async (id: string) => {
    const client = await getClient();

    const cmd = new DeleteCommand({
        TableName: "fem-dev-invoices",
        Key: { id }
    });

    await client.send(cmd);
};