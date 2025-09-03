// components/JobsBrowser.tsx
"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Hit } from "@/components/Hit";
import {getLatestJobs} from "@/lib/dynamo";

export default function JobsBrowser() {
    const [since, setSince] = useState(30); // 30m ago
    const { data, isLoading } = useQuery({
        queryKey: ["jobs", since],
        queryFn: async () => getLatestJobs(Date.now() - since * 60 * 1000),
    });

    return (
        <div className={`flex flex-col gap-6`}>
            <input
                value={since}
                onChange={(e) => setSince(Number(e.target.value))}
            />
            {isLoading && <p>Loading…</p>}
            {data?.Items?.map((job: any) => (
                <Hit key={job.id} job={job} />
            ))}
        </div>
    );
}