import {ClientError, gql, GraphQLClient} from "graphql-request";
import {DateTime} from "luxon";
import { redis } from "./redis.js";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(client);

import {getAuthToken, handle401, logIn, isLoggedIn} from "./auth.js";
//import {getRecords, upsertRecords} from "./main/db.js";

const getRecords = () => {
    return []
}

const upsertRecords = () => {

}

const saveItem = async (item) => {
    try {

        const params = {
            TableName: "fem-qa-jobs",
            Item: item
        };

        await ddbDocClient.send(new PutCommand(params));

        return "Saved"
    } catch (err) {
        console.error("DynamoDB error:", err);
        throw "Could not save item"
    }
};

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

export const loadJobs = async (variables, fields) => {
    const client = new GraphQLClient('https://api.upwork.com/graphql', {
        headers: {
            Authorization: `Bearer ${await getAuthToken()}`,
        }
    });

    const fieldList = fields.join('\n');

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
    }`;

    try {
        const data = await client.request(query, variables);
        const sanitizedJobs = sanitizeJobsResult(data);
        const rows = sanitizedJobs.marketplaceJobPostingsSearch.edges;

        console.log("total jobs", rows.length)

        if (rows.filter(valuable).length > 0) {
            console.log("valuable jobs", JSON.stringify(rows.filter(valuable), null, 2))
            //new Notification({ title: 'Notification', body: 'Valuable jobs received from Electron' }).show();
            await Promise.all(
                rows.map(async (row) => {
                    let job = row.node;
                    console.log("saving job", JSON.stringify(job, null, 2));

                    job.publishedDateTime = toEpochMs(job.publishedDateTime);
                    job.value = formatValue(job);
                    job.valuable = valuable(row)?1:0;

                    await saveItem(job);
                })
            );
            redis.publish("jobs", rows.filter(valuable).map(job=>({id:job.node.id, title:job.node.title, value: formatValue(job.node), category:job.node.category, publishedDateTime:toEpochMs(job.node.publishedDateTime)})))
        }
        else {
            console.log("no valuable jobs")
        }

        upsertRecords(rows);
        const datetime = DateTime.now().minus({ hours: 5 }).toMillis();
        const records = getRecords(datetime);

        return {
            marketplaceJobPostingsSearch: {
                edges: records
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

function valuable(job) {
    const value = formatValue(job.node);
    if ((value.type==="per hour" && Number(value.value)>80) || (value.type==="per project" && Number(value.value)>=1000)) {
        //if (value.category === "web_mobile_software_dev") {
        return true;
        //}
    }
    return false;
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
    const attemptResponse = await attemptLogin();
    console.log(JSON.stringify(attemptResponse, null, 2));
    await loadJobs(variables, fields)
};