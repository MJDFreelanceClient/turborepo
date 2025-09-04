import JobsBrowser from "@/components/JobsBrowser";
import {getLatestJobs} from "@/lib/dynamo";

export default async function Home() {
    const initialJobs = await getLatestJobs(Date.now() - 30 * 60 * 1000);

    return (
        <div className="flex flex-col gap-6 p-4">
            <JobsBrowser initialJobs={initialJobs} />
        </div>
    );
}