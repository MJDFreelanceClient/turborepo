"use server"

// Import the required AWS SDK clients and commands for Node.js
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {NumberValue, PutCommand, QueryCommand} from "@aws-sdk/lib-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

// Create an Amazon DynamoDB service client object.
const client = new DynamoDBClient({ region: "us-east-1" });

// Use DynamoDBDocumentClient to simplify working with native JS objects
const ddbDocClient = DynamoDBDocumentClient.from(client);

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
        const data = await ddbDocClient.send(new PutCommand(params));
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

    return await ddbDocClient.send(new QueryCommand(params));
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

    const response = await ddbDocClient.send(new QueryCommand(params));

    console.log("classification response", response);

    return (response).Items?.[0] || null;
}
