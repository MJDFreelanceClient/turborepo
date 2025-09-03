"use client"

import { useQuery } from "@tanstack/react-query";
import {getClassification} from "@/lib/dynamo";

export function useClassification(jobId: string) {
    return useQuery({
        queryKey: ["classification", jobId],
        queryFn: () => getClassification(jobId),
        enabled: !!jobId,        // only run if we have an id
        staleTime: data => (data ? Infinity : 0), // ⚡ pseudo-code, see note below
        cacheTime: 1000 * 60 * 60 * 24, // keep in cache for 24h
        refetchInterval: (data) => (data ? false : 5000), // poll if not ready
    });
}

export const Hit = ({job}:any) => {
    const { data: classification, isLoading, error } = useClassification(job.id) as any;

    return (
        <div key={job.id} className={`p-4 border-2 rounded-lg ${classification?.decision==="miss" && "border-red-800"} ${classification?.decision==="hit" && "bg-green-100"}`}>
            <div>
                <span>{job.id}</span>
                <h2 className="text-lg font-semibold">{job.title}</h2>
                <p className="text-gray-600">{job.description}</p>
                <p className="text-gray-600">Posted: {new Date(job.publishedDateTime).toLocaleString()}</p>
                <p>
                    Verdict: {classification?classification.reason: "Loading..."}
                </p>
                <a href={job.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">View Job</a>
                <a href={`/classifications/${job.id}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">View Classification</a>
            </div>
        </div>
    );
};