"use client"

import JobDescription from "@/components/JobDescription";

const description = `
## Note
We will send an offer and cover interview time.

## About Us
We are building an enterprise-grade AI SaaS platform...

## Key Requirements
1. **Ingestion & Enrichment**
   - Ingest articles from multiple sources.
   - Enrich with tags, metadata, embeddings.

2. **Personalization**
   - Filtering + ranking system per user profile.
   - ...

## Budget & Engagement
- One-time project
- 5 hours work
- Budget: $1,000 – $2,000
`;

export const Hit = ({job}:any) => {
    console.log("job", job)

    const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    });

    const projectRate =
        job.value?.type === "per project"
            ? job.max
                ? formatter.format(job.value.value / job.max)
                : "too low"
            : null;


    return (
        <div key={job.id} className={`p-4 border-2 rounded-lg ${job?.verdict==="miss" && "border-red-800"} ${job?.verdict==="hit" && "bg-green-100"}`}>
            <div>
                <span>{job.id}</span>
                ${job.value && <b >{job.value.value}{job.value.currency} {job.value.type}</b>}
                <h2 className="text-lg font-semibold">{job.title}</h2>
                {job.max && projectRate && <p className={` ${job.value.value / job.max < 10 ? "text-red-800" : "text-gray-600"}`}>Time Range: {job.min} - {job.max} hours, Effective rate {projectRate}</p>}
                <JobDescription text={job.description} />
                <p className="text-gray-600">Posted: {new Date(job.publishedDateTime).toLocaleString()}</p>
                <p>
                    Verdict: {job?.verdict_reason?job.verdict_reason: "Loading..."}
                </p>
                <a href={`https://turborepo-upwork-app.vercel.app/api/clickthrough/${job.id}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">View Job</a>
                <a href={`/apply/${job.id}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Build Application</a>
            </div>
        </div>
    );
};