// lib/db.ts
import {
    DynamoDBClient,
} from "@aws-sdk/client-dynamodb";
import {
    DynamoDBDocumentClient,
    ScanCommand,
    PutCommand,
    UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import {fromWebToken} from "@aws-sdk/credential-providers";

const region = process.env.AWS_REGION!;
const roleArn = process.env.AWS_ROLE_ARN!;
const token = process.env.VERCEL_OIDC_TOKEN!;

export const getClient = async () => {
    const region = process.env.AWS_REGION!;
    const roleArn = process.env.AWS_ROLE_ARN!;
    const token = process.env.VERCEL_OIDC_TOKEN!;

    const baseClient = new DynamoDBClient({
        region,
        credentials: fromWebToken({
            roleArn,
            webIdentityToken: token,
            roleSessionName: "vercel-session",
        }),
    });

    // ✅ This will force AWS to try resolving the credentials
    try {
        const creds = await baseClient.config.credentials();
        console.log("Resolved credentials:", creds);
    } catch (err) {
        console.error("❌ Failed to resolve credentials:", err);
    }

    return DynamoDBDocumentClient.from(baseClient);
};


const TableName = "fem-dev-solid-todo";

export const getTodos = async () => {
    if (!token) {
        console.warn("Missing VERCEL_OIDC_TOKEN, skipping getTodos()");
        return [];
    }

    const db = await getClient();
    const data = await db.send(new ScanCommand({ TableName }));
    return data.Items;
};

export const addTodo = async (text: string) => {
    const item = {
        id: Date.now().toString(),
        text,
        done: false,
    };
    const db = await getClient();
    await db.send(new PutCommand({ TableName, Item: item }));
    return item;
};

export const markTodoDone = async (id: string) => {
    const db = await getClient();
    await db.send(
        new UpdateCommand({
            TableName,
            Key: { id },
            UpdateExpression: "set done = :done",
            ExpressionAttributeValues: { ":done": true },
        })
    );
};
