"use client"

import { useQuery } from "@tanstack/react-query";
import {getClassification} from "@/lib/dynamo";

export const Hit = ({job}:any) => {
    console.log("job", job)

    return (
        <div key={job.id} className={`p-4 border-2 rounded-lg ${job?.verdict==="miss" && "border-red-800"} ${job?.verdict==="hit" && "bg-green-100"}`}>
            <div>
                <span>{job.id}</span>
                ${job.value && <b >{job.value.value}{job.value.currency} {job.value.type}</b>}
                <h2 className="text-lg font-semibold">{job.title}</h2>
                <p className="text-gray-600">{job.description}</p>
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