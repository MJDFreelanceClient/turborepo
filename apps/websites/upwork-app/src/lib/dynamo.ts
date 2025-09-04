"use server"

// Import the required AWS SDK clients and commands for Node.js
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {NumberValue, QueryCommand} from "@aws-sdk/lib-dynamodb";
import { DynamoDBDocumentClient, PutCommand  } from "@aws-sdk/lib-dynamodb";
import {fromWebToken} from "@aws-sdk/credential-providers";
import { awsCredentialsProvider } from '@vercel/functions/oidc';

export const getClient = async () => {
    const region = process.env.AWS_REGION!;
    const roleArn = process.env.AWS_ROLE_ARN!;

    const baseClient = new DynamoDBClient({
        region,
        credentials: awsCredentialsProvider({
            roleArn,
        }),
    });

    return DynamoDBDocumentClient.from(baseClient);
}

const autogenerateId = () => {
    return Date.now().toString();
};

export async function addItem(Item:any) {
    const id = autogenerateId();
    const params = {
        TableName: "fem-qa-jobclickthroughs",
        Item: {
            id,
            ...Item
        },
    };

    try {
        const data = await (await getClient()).send(new PutCommand(params));
        console.log("Success - item added:", data);
    } catch (err) {
        console.error("Error", err);
    }
}

export async function saveGuidance(Item:any) {
    const params = {
        TableName: "fem-qa-job-application-guidance",
        Item,
    };

    try {
        const data = await (await getClient()).send(new PutCommand(params));
        console.log("Success - item added:", data);
    } catch (err) {
        console.error("Error", err);
    }
}

export async function getLatestJobs(since:number) {
    const params = {
        TableName: "fem-qa-jobs",
        IndexName: "gsiValuablePublishedDateTime",
        KeyConditionExpression: "valuable = :v AND publishedDateTime >= :t",
        ExpressionAttributeValues: {
            ":v": 1,                // only valuable=1
            ":t": since,       // only last 30 min
            ":c": "web_mobile_software_dev"
        },
        FilterExpression: "category = :c",
        ScanIndexForward: false   // newest first (optional)
    };

    return await (await getClient()).send(new QueryCommand(params));
}

export async function getClassification(id: string) {
    console.log("getting classification", id);
    const params = {
        TableName: "fem-qa-job-classification",
        KeyConditionExpression: "id = :id",
        ExpressionAttributeValues: {
            ":id": id,
        },
    };

    const response = await (await getClient()).send(new QueryCommand(params));

    console.log("classification response", response);

    return (response).Items?.[0] || null;
}

export async function getGuidance(id: string) {
    console.log("getting guidance", id);
    const params = {
        TableName: "fem-qa-job-application-guidance",
        KeyConditionExpression: "id = :id",
        ExpressionAttributeValues: {
            ":id": id,
        },
    };

    const response = await (await getClient()).send(new QueryCommand(params));

    console.log("classification response", response);

    return (response).Items?.[0] || null;
}

export async function getJob(id: string) {
    console.log("getting job", id);
    const params = {
        TableName: "fem-qa-jobs",
        KeyConditionExpression: "id = :id",
        ExpressionAttributeValues: {
            ":id": id,
        },
    };

    const response = await (await getClient()).send(new QueryCommand(params));

    console.log("classification response", response);

    return (response).Items?.[0] || null;
}
