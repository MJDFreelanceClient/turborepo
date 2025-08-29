// src/routes/api/todos.ts
import { APIEvent } from "solid-start";
import { getTodos, addTodo, markTodoDone } from "~/lib/db";
import {DynamoDBClient} from "@aws-sdk/client-dynamodb";
import {DynamoDBDocumentClient} from "@aws-sdk/lib-dynamodb";
import {fromWebToken} from "@aws-sdk/credential-providers";

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

export async function GET() {
    const todos = await getTodos();
    return new Response(JSON.stringify(todos), {
        headers: { "Content-Type": "application/json" },
    });
}

export async function POST({ request }: APIEvent) {
    const { text } = await request.json();
    const todo = await addTodo(text);
    return new Response(JSON.stringify(todo), {
        headers: { "Content-Type": "application/json" },
    });
}

export async function PUT({ request }: APIEvent) {
    const { id } = await request.json();
    await markTodoDone(id);
    return new Response(null, { status: 204 });
}
