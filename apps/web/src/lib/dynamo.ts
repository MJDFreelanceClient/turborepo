"use server"

import {DynamoDBClient} from "@aws-sdk/client-dynamodb";
import {fromWebToken} from "@aws-sdk/credential-providers";
import {DynamoDBDocumentClient, PutCommand, ScanCommand} from "@aws-sdk/lib-dynamodb";
import { cache } from 'react';

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

// Create the lib-dynamodb wrapper
    return DynamoDBDocumentClient.from(baseClient);
}

export type Pot = {
    id: string,
    name: string,
    target: number,
    total: number,
    theme: string
}

export type Transaction = {
    id: string,
    avatar: string,
    name: string,
    category: string,
    date: string,
    amount: number,
    recurring: false
}

export type Budget = {
    id: string,
    category: string,
    maximum: number,
    theme: string
}

export const getPots = cache(async () => {
    console.log("Getting pots...");

    const docClient= await getClient()

    const command = new ScanCommand({
        TableName: 'fem-dev-finance-pots',
    });

    const {Items} = await docClient.send(command);

    return Items as Pot[];
});

export const getBudgets = cache(async () => {
    const docClient= await getClient()

    const command = new ScanCommand({
        TableName: 'fem-dev-finance-budgets',
    });

    const {Items} = await docClient.send(command);

    return Items as Budget[];
});

export const getTransactions = cache(async () => {
    const docClient= await getClient()

    const command = new ScanCommand({
        TableName: 'fem-dev-finance-transactions',
    });

    const {Items} = await docClient.send(command);

    return Items as Transaction[];
});

export const addPot = async (newPot: { id: string; name: string; target: number, total: number, theme: string }) => {

    try {
        const docClient = await getClient();

        const command = new PutCommand({
            TableName: 'fem-dev-finance-pots',
            Item: newPot,
        });

        await docClient.send(command);

    }

    catch (error) {
        console.error('Error adding pot to DynamoDB:', error);
        throw error; // Re-throw the error for further handling
    }
};
