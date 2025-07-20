import { unmarshall } from '@aws-sdk/util-dynamodb';
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { ZodSchema } from "zod";

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