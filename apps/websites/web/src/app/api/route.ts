// apps/web/pages/api/test-lib-dynamo.ts
import { PutCommand } from '@aws-sdk/lib-dynamodb';

import data from '@/app/personal-finance/data.json';
import {getClient} from "@/lib/dynamo";

export async function GET() {
    const region = process.env.AWS_REGION;
    const roleArn = process.env.AWS_ROLE_ARN;
    const token = process.env.VERCEL_OIDC_TOKEN;

    if (!region || !roleArn || !token) {
        return new Response(JSON.stringify({ error: 'Missing AWS OIDC environment variables' }), {
            status: 500,
        });
    }

    try {
        // Base client using OIDC credentials
        const docClient = getClient(region, roleArn, token);

        data.pots.forEach((pot, index) => {
            const command = new PutCommand({
                TableName: 'fem-dev-finance-pots', // replace with a real table
                Item: {id:(index+1).toString(), ...pot},
            });

            docClient.send(command);
        })

        return new Response(JSON.stringify({ message: 'PutItem successful' }), {
            status: 200,
        });
    } catch (err: any) {
        return new Response(JSON.stringify({ error: err.message || err.toString() }), {
            status: 500,
        });
    }
}
