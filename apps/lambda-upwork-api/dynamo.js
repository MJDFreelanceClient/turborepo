import {DynamoDBDocumentClient, QueryCommand} from "@aws-sdk/lib-dynamodb";
import {DynamoDBClient} from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(client);

export async function getVersionByName(name) {
    // Validate input
    if (!name || typeof name !== "string") {
        throw new Error("'name' must be a non-empty string.");
    }

    // Define query parameters
    const params = {
        TableName: "fem-qa-job-openai-versions", // Table name
        IndexName: "gsiName",            // GSI to query
        KeyConditionExpression: "task_name = :n", // Key condition
        ExpressionAttributeValues: {
            ":n": name, // Bind name value
        },
    };

    try {
        // Query DynamoDB
        console.log("Querying DynamoDB with params:", params);
        const result = await ddbDocClient.send(new QueryCommand(params));

        console.log("Query result:", result);

        const prompt = result.Items?.[0]?.prompt || null;

        console.log("Query prompt:", prompt);

        // Return first item or null if no match found
        return prompt;
    } catch (error) {
        // Log and rethrow error
        console.error("Failed to query DynamoDB:", error.message);
        throw new Error("Could not fetch versions by name");
    }
}
