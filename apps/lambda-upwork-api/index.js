import {ClientError, gql, GraphQLClient} from "graphql-request";
import {DateTime} from "luxon";
import { redis } from "./redis.js";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { classifyJobs } from "./openai.js";
import { Resend } from "resend";
import { doRefresh, getAuthToken, handle401, logIn, isLoggedIn } from "./auth.js"; // assuming you meant to include this

const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(client);
const resend = new Resend(process.env.RESEND_API_KEY);

async function jobExists(id, version) {
    try {
        console.log("getting job", id);
        const params = {
            TableName: "fem-qa-jobs",
            KeyConditionExpression: "id = :id",
            ExpressionAttributeValues: {
                ":id": id,
            },
        };

        const response = await ddbDocClient.send(new QueryCommand(params));

        console.log("classification response", response);

        return (response).Items?.[0] || null;
    } catch (err) {
        console.error("DynamoDB jobExists error:", err);
        return false; // fail safe: treat as new if error
    }
}

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

async function saveItem(tableName, item) {
    try {
        await ddbDocClient.send(new PutCommand({ TableName: tableName, Item: item }));
        return "Saved";
    } catch (err) {
        console.error("DynamoDB error:", err);
        throw new Error("Could not save item");
    }
}

const getRecords = () => {
    return []
}

const upsertRecords = () => {

}

function toEpochMs(ts) {
    if (typeof ts === 'number') return ts;                // already ms
    if (typeof ts === 'string') {
        // Normalize "+HHMM" → "+HH:MM" and accept Z
        const fixed = ts.replace(/([+-]\d{2})(\d{2})$/, '$1:$2');
        const ms = Date.parse(fixed);
        if (!Number.isNaN(ms)) return ms;
    }
    return Date.now(); // fallback
}

async function fetchJobs(variables, fields) {
    const client = new GraphQLClient("https://api.upwork.com/graphql", {
        headers: { Authorization: `Bearer ${await getAuthToken()}` }
    });

    const fieldList = fields.join("\n");

    const query = gql`
    query SearchJobs(
      $marketPlaceJobFilter: MarketplaceJobPostingsSearchFilter,
      $searchType: MarketplaceJobPostingSearchType,
      $sortAttributes: [MarketplaceJobPostingSearchSortAttribute]
    ) {
      marketplaceJobPostingsSearch(
        marketPlaceJobFilter: $marketPlaceJobFilter,
        searchType: $searchType,
        sortAttributes: $sortAttributes
      ) {
        totalCount
        edges {
          node {
            ${fieldList}
          }
        }
      }
    }
  `;

    const data = await client.request(query, variables);
    return sanitizeJobsResult(data);
}

function filterValuableJobs(jobs) {
    return jobs.filter(job => valuable(job));
}

async function classifyAndSave(jobs) {
    if (jobs.length === 0) return { hits: [], classifications: [] };

    const classifiedItems = await classifyJobs(jobs);
    await Promise.all(
        classifiedItems.map(c =>
            saveItem("fem-qa-job-classification", { ...c, timestamp: Date.now(), version: "0.0.1" })
        )
    );

    const classificationMap = Object.fromEntries(classifiedItems.map(c => [c.id, c.decision]));
    const hits = jobs.filter(job => classificationMap[job.id] === "hit");

    return { hits, classifications: classifiedItems };
}

async function notifyHits(hits) {
    if (hits.length === 0) return;
    const html = hits.map(item => itemToCard(item)).join("");
    await resend.emails.send({
        from: "no-reply@michaeljdfreelance.com",
        to: "michael@michaeljdfreelance.com",
        subject: "New jobs found",
        html,
    });
}

async function persistJobs(jobs, classifications) {
    const classificationMap = Object.fromEntries(classifications.map(c => [c.id, c]));
    await Promise.all(
        jobs.map(async job => {
            const classification = classificationMap[job.id];

            if (classification) {
                job.verdict = classification.decision;
                job.verdict_reason = classification.reason;
            }

            job.publishedDateTime = toEpochMs(job.publishedDateTime);
            job.value = formatValue(job);
            job.valuable = valuable(job) ? 1 : 0;

            await saveItem("fem-qa-jobs", job);
        })
    );
}

async function normalizeAndDedupe(edges, version = "0.0.1") {
    const nodes = edges.map(e => e?.node).filter(Boolean);

    // Deduplicate within the batch itself
    const unique = [...new Map(nodes.map(job => [job.id, job])).values()];

    // Check existence in Dynamo
    const results = await Promise.all(
        unique.map(async job => {
            const exists = await jobExists(job.id, version);
            return exists ? null : job;
        })
    );

    return results.filter(Boolean); // drop nulls
}

async function publishJobs(jobs) {
    const jobsToPublish = jobs
        .filter(row => valuable(row))
        .map(row => ({
            id: row.id,
            title: row.title,
            value: formatValue(row),
            category: row.category,
            publishedDateTime: toEpochMs(row.publishedDateTime)
        }));

    if (jobsToPublish.length > 0) {
        redis.publish("jobs", jobsToPublish);
    }
}

export async function loadJobs(variables, fields) {
    try {
        const rows = await fetchJobs(variables, fields);
        const edges = rows.marketplaceJobPostingsSearch.edges;
        const jobs = await normalizeAndDedupe(edges);
        const valuableJobs = filterValuableJobs(jobs);
        const { hits, classifications } = await classifyAndSave(
            valuableJobs.filter(job => job.category === "web_mobile_software_dev")
        );
        await notifyHits(hits);
        await persistJobs(jobs, classifications);
        await publishJobs(jobs);

        return {
            marketplaceJobPostingsSearch: {
                edges: getRecords(DateTime.now().minus({ hours: 5 }).toMillis())
            }
        };
    } catch (err) {
        // Handle GraphQL errors with partial data
        if (err instanceof ClientError && err.response?.data) {
            console.warn('GraphQL errors:', err.response.errors);
            const partial = sanitizeJobsResult(err.response.data);
            return partial;
        }

        // Handle 401 Unauthorized explicitly
        if (err instanceof ClientError && err.response?.status === 401) {
            console.warn('Unauthorized (401): Token may be invalid or expired.');
            await handle401();
            // Optionally trigger a logout flow or token refresh here
            return {
                error: 'unauthorized',
                message: 'Your session has expired. Please log in again.',
                marketplaceJobPostingsSearch: { edges: [] }
            };
        }

        if (err.code === 'ECONNREFUSED' || err.code === 'ENOTFOUND') {
            console.error('Network error:', err.message);
            return {
                error: 'network',
                message: 'Unable to connect to the server. Please check your internet connection.',
                marketplaceJobPostingsSearch: { edges: [] }
            };
        }

        console.error('Unexpected GraphQL error:', err);
        return {
            error: 'unknown',
            message: 'An unexpected error occurred.',
            marketplaceJobPostingsSearch: { edges: [] }
        };
    }
}

function formatValue(job) {
    if (job.hourlyBudgetMax) {
        return {
            value: job.hourlyBudgetMax?.displayValue,
            currency: job.hourlyBudgetMax.currency,
            type: "per hour"
        }
    }
    else {
        return {
            value: job.amount?.rawValue,
            currency: job.amount?.currency,
            type: "per project"
        }
    }
}

function valuable(jobNode) {
    const value = formatValue(jobNode);
    return (
        (value.type === "per hour" && Number(value.value) >= 60) ||
        (value.type === "per project" && Number(value.value) >= 1000)
    );
}

function sanitizeJobsResult(raw, { requireExpLevel = false } = {}) {
    const edges = raw?.marketplaceJobPostingsSearch?.edges ?? [];
    const cleanedEdges = edges
        .filter((e) => e && e.node) // drop null edges/nodes
        .filter((e) => (requireExpLevel ? !!e.node.experienceLevel : true)); // optionally require exp level

    return {
        ...raw,
        marketplaceJobPostingsSearch: {
            ...raw?.marketplaceJobPostingsSearch,
            edges: cleanedEdges,
        },
    };
}

const attemptLogin = async () => {
    if (!await isLoggedIn()) {
        console.log("Attempting to gain access")
        const refreshToken = await redis.get("UPWORK_REFRESH_TOKEN");
        if (refreshToken) {
            console.log("Refreshing token")
            const tokenData = await doRefresh(refreshToken);
            if (tokenData.access_token) {
                return "You are now logged in"
            }
        }
        console.log("Refrsh token not found, attempting to exchange code");
        const code = await redis.get("UPWORK_CODE");
        if (!code) {
            throw new Error("No code found")
        }
        return await logIn(code);
    }
    return "Already logged in"
}

const fields = ['title',
    'category', 'description', 'id', 'ciphertext', 'durationLabel', 'engagement', 'recordNumber',
    'category', 'subcategory', 'freelancersToHire',
    'enterprise', 'relevanceEncoded', 'totalApplicants', 'preferredFreelancerLocation',
    'preferredFreelancerLocationMandatory', 'premium', 'clientNotSureFields', 'clientPrivateFields',
    'applied', 'createdDateTime', 'publishedDateTime', 'renewedDateTime',
    'localJobUserDistance', 'duration', 'experienceLevel', 'hourlyBudgetType',
    'totalFreelancersToHire', 'teamId',

    'amount {rawValue currency displayValue}', 'hourlyBudgetMin {rawValue currency displayValue}',
    'hourlyBudgetMax {rawValue currency displayValue}', 'weeklyBudget {rawValue currency displayValue}',
    'engagementDuration {label weeks}'
];

const variables = {
    searchType: "USER_JOBS_SEARCH",
    sortAttributes: [{ field: "RECENCY" }],
    marketPlaceJobFilter: {
        pagination_eq: { "after": 0, "first": 100 }
    }
};

export const handler = async (event) => {
    try {
        const attemptResponse = await attemptLogin();
        console.log("Login response:", attemptResponse);
        const jobs = await loadJobs(variables, fields);
        return {
            statusCode: 200,
            body: JSON.stringify(jobs),
        };
    } catch (err) {
        console.error("Handler error:", err);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Internal Server Error" }),
        };
    }
};