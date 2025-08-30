// Import the required AWS SDK clients and commands for Node.js
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
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