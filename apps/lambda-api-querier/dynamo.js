import {DeleteCommand, DynamoDBDocumentClient, GetCommand, PutCommand, ScanCommand} from "@aws-sdk/lib-dynamodb";
import {DynamoDBClient} from "@aws-sdk/client-dynamodb";
import {fromWebToken} from "@aws-sdk/credential-providers";
import { marshall } from '@aws-sdk/util-dynamodb';

const TableName = "fem-qa-food";

export const getClient = async () => {

    const region = process.env.AWS_REGION;
    const roleArn = process.env.AWS_ROLE_ARN;
    const token = process.env.VERCEL_OIDC_TOKEN;

    const credentials = (roleArn && token)
        ? fromWebToken({ roleArn, webIdentityToken: token, roleSessionName: 'vercel-session' })
        : undefined;

    const baseClient = new DynamoDBClient({
        region,
        credentials,
    });

    console.log(baseClient)

// Create the lib-dynamodb wrapper
    return DynamoDBDocumentClient.from(baseClient, {
        marshallOptions: {
            removeUndefinedValues: true, // ✅ THIS is required!
        },
    });
}

export const scanItems = async () => {
    const client = await getClient();
    const cmd = new ScanCommand({ TableName });
    const res = await client.send(cmd);
    return res.Items ?? [];
}

export const createItem = async (item) => {
    const client = await getClient();
    const cmd = new PutCommand({
        TableName,
        Item: item
    });
    const response = await client.send(cmd);
    console.log("response", response);
};

export const getItem = async (id) => {
    const client = await getClient();
    const cmd = new GetCommand({
        TableName,
        Key: { id },
    });
    const start = performance.now();
    const res = await client.send(cmd);
    const end = performance.now();
    console.log(`That took ${(end - start).toFixed(2)}ms`);
    return res.Item;
};

export const deleteItem = async (id) => {
    const client = await getClient();

    const cmd = new DeleteCommand({
        TableName,
        Key: { id }
    });

    await client.send(cmd);
};