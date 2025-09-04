"use client"

import {getReccomendation} from "@/lib/openai";
import {useEffect, useState} from "react";
import {getGuidance, saveGuidance} from "@/lib/dynamo";
import {Questions} from "@/components/Questions";

export default function Recommendation({ data }:any) {

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-2">Analysis</h2>
            <Section title="Tone & Client Priorities" items={data.tone_and_priorities} />
            <Section title="Client Persona" items={data.client_persona} />
            <Section title="Your Best Tone" items={data.your_best_tone} />
            {data?.on_client_questions?.length > 0 && (
                <Section title="On Client Questions" items={data.on_client_questions} />
            )}
        </div>
    );
}

function Section({ title, items }:any) {
    return (
        <div className="p-4 rounded-2xl shadow bg-white">
            <h2 className="text-xl font-semibold mb-2">{title}</h2>
            <ul className="list-disc list-inside space-y-1">
                {items?.map((item:any, idx:number) => (
                    <li key={idx} className="text-gray-700">
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export const ApplicationAdvice = ({job}:any) => {
    const [response, setResponse] = useState<any|null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [questions, setQuestions] = useState<string[]>([]);
    const {description} = job;

    useEffect(()=>{
        setIsLoading(true)
        getGuidance(job.id).then(guidance=>{
            if (guidance && Object.entries(guidance).length > 0) {
                setResponse(guidance)
            }
            setIsLoading(false)
        });
    }, [job.id])

    const requestAdvice = async () => {
        const request = {
            "job_post": {
                description,
                questions,
                budget: job.value? `${job.value.value}${job.value.currency} ${job.value.type}`: "",
                experience_level: job.experienceLevel,
                duration: job.engagementDuration
            }
        }

        setIsLoading(true)

        const guidance = await getReccomendation(request);

        const parsedGuidance = JSON.parse(guidance??"")

        await saveGuidance({id:job.id, ...parsedGuidance})

        setIsLoading(false)

        setResponse(parsedGuidance);
    }

    return (
        <>
            {job && <h1>{job.title}</h1>}
            {job && <p>{job.description}</p>}
            <Questions questions={questions} setQuestions={setQuestions} />
            {response && <Recommendation data={response}/>}
            {!response && !isLoading && <button onClick={requestAdvice}>Request Advice</button>}
            {isLoading && <p>Loading...</p>}
        </>
    );
};