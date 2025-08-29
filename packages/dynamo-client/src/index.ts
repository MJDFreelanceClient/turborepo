import { unmarshall } from '@aws-sdk/util-dynamodb';
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { ZodSchema } from "zod";
import {fromWebToken} from "@aws-sdk/credential-providers";

export const parse = (record:any) => {
    const { eventName, dynamodb } = record;

    const newImage = unmarshall(dynamodb.NewImage || {});
    const oldImage = unmarshall(dynamodb.OldImage || {});

    return {
        newRecord: newImage,
        oldRecord: oldImage,
        op: eventName,
        shouldContinue: !dynamodb.NewImage && !dynamodb.OldImage
    }
}

const ddb = DynamoDBDocumentClient.from(new DynamoDBClient({ region: "us-east-1" }));

export async function save<T extends Record<string, any>>(
    model: { tableName: string; schema: ZodSchema<T> },
    item: unknown,
    ddb: DynamoDBDocumentClient
): Promise<T> {
    const parsed = model.schema.parse(item);

    await ddb.send(new PutCommand({
        TableName: model.tableName,
        Item: parsed, // now guaranteed to be a valid object
    }));

    return parsed;
}

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