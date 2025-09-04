// components/JobsBrowser.tsx
"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Hit } from "@/components/Hit";
import {getLatestJobs} from "@/lib/dynamo";

export default function JobsBrowser({ initialJobs }: { initialJobs: any }) {
    const [since, setSince] = useState(30);
    const [verdictFilter, setVerdictFilter] = useState<"all" | "hit" | "miss">("all");

    const { data, isLoading } = useQuery({
        queryKey: ["jobs", since],
        queryFn: async () => getLatestJobs(Date.now() - since * 60 * 1000),
        initialData: since === 30 ? initialJobs : undefined,
    });

    const filteredJobs =
        verdictFilter === "all"
            ? data?.Items
            : data?.Items?.filter((job: any) => job.verdict === verdictFilter);

    return (
        <div className="flex flex-col gap-6">
            <div className="flex gap-4 items-center">
                <label>
                    Since (minutes):{" "}
                    <input
                        value={since}
                        onChange={(e) => setSince(Number(e.target.value))}
                        className="border rounded p-1 w-20"
                    />
                </label>
                <label>
                    Verdict:{" "}
                    <select
                        value={verdictFilter}
                        onChange={(e) => setVerdictFilter(e.target.value as "all" | "hit" | "miss")}
                        className="border rounded p-2"
                    >
                        <option value="all">All</option>
                        <option value="hit">Hit</option>
                        <option value="miss">Miss</option>
                    </select>
                </label>
            </div>

            {isLoading && <p>Loading…</p>}
            {filteredJobs?.map((job: any) => (
                <Hit key={job.id} job={job} />
            ))}
        </div>
    );
}