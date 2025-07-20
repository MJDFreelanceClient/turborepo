import { AlgoliaClientWrapper } from 'algolia-client';
import { parse } from 'dynamo-client';

// Lambda handler for DynamoDB Stream
export const handler = async (event) => {
    for (const record of event.Records) {
        // Parse the stream record into a usable format
        const { newRecord, oldRecord, op, shouldContinue } = parse(record);

        if (shouldContinue) continue; // e.g., unsupported op, no data

        // Extract table name from ARN (e.g. "arn:aws:dynamodb:...:table/your-table/stream/...")
        const tableName = record?.eventSourceARN?.split('/')?.[1];
        if (!tableName) {
            console.warn('Missing or invalid table name in record:', record.eventSourceARN);
            continue;
        }

        // Initialize a scoped Algolia client for that table
        const algoliaClient = new AlgoliaClientWrapper(tableName);

        // Perform the appropriate update (add, update, delete)
        await algoliaClient.updateItem({ op, newRecord, oldRecord });
    }
};