import JobsBrowser from "@/components/JobsBrowser";

export default function Home() {
    return (
        <div className="flex flex-col gap-6 p-4">
            <JobsBrowser />
        </div>
    );
}