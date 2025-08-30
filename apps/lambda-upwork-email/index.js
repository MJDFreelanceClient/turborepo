import { QueryCommand } from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { Resend } from 'resend';

const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(client);
const resend = new Resend(process.env.RESEND_API_KEY);

function itemToCard(item) {
    // pick out title & description specially
    const { title, description, value, ...rest } = item;

    const rows = Object.entries(rest).map(([k, v]) => `
      <tr>
        <th align="left" style="padding: 4px 8px; border: 1px solid #ddd; background:#f9f9f9;">${k}</th>
        <td style="padding: 4px 8px; border: 1px solid #ddd;"><pre>${JSON.stringify(v, null, 2)}</pre></td>
      </tr>
    `).join("");

    return `
    <div style="margin-bottom: 20px; padding: 10px; border: 1px solid #ccc; border-radius: 6px;">
      ${
        title
            ? `<h2 style="margin: 0 0 4px 0;">
               ${item.id ? `<a href="https://turborepo-upwork-app.vercel.app/api/clickthrough/${item.id}" style="color: #0066cc; text-decoration: none;">${title}</a>` : title}
             </h2>`
            : ""
    }
      ${value ? `<b style="margin: 0 0 8px 0;">${value.value}${value.currency} ${value.type}</b>` : ""}
      ${description ? `<p style="margin: 0 0 8px 0;">${description}</p>` : ""}
      <table cellpadding="0" cellspacing="0" style="border-collapse: collapse; width: 100%;">
        ${rows}
      </table>
    </div>
  `;
}

export const handler = async (event) => {
    const halfHourAgo = Math.floor(Date.now()) - (30 * 60 * 1000);

    const params = {
        TableName: "fem-qa-jobs",
        IndexName: "gsiValuablePublishedDateTime",
        KeyConditionExpression: "valuable = :v AND publishedDateTime >= :t",
        ExpressionAttributeValues: {
            ":v": 1,                // only valuable=1
            ":t": halfHourAgo       // only last 30 min
        },
        ScanIndexForward: false   // newest first (optional)
    };

    const result = await ddbDocClient.send(new QueryCommand(params));

    const filteredItems = result.Items.filter(job=>job.category==="web_mobile_software_dev");

    if (filteredItems.length === 0) {
        return "No matching jobs";
    }

    const html = filteredItems.map(itemToCard).join("");

    await resend.emails.send({
        from: 'no-reply@michaeljdfreelance.com',
        to: "michael@michaeljdfreelance.com",
        subject: 'New jobs found',
        html,
    });

    console.log(`${filteredItems.length} items sent`);

    return filteredItems;
};