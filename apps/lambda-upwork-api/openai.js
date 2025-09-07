import OpenAI from "openai";
import {getVersionByName} from "./dynamo.js";

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // set in Lambda env vars
});

export const classifyJobs = async (jobs) => {
    const content = await getVersionByName("classifier")

    try {
        const response = await client.chat.completions.create({
            model: "gpt-4o-mini",
            temperature: 0,
            messages: [
                {
                    role: "system",
                    content
                },
                { role: "user", content: JSON.stringify(jobs) }
            ]
        });

        return JSON.parse(response.choices[0].message.content);
    } catch (err) {
        console.error("Error:", err);
        return [];
    }
};


export const estimateJobs = async (jobs) => {
    const content = await getVersionByName("estimator")

    try {
        const response = await client.chat.completions.create({
            model: "gpt-4o-mini",
            temperature: 0,
            messages: [
                {
                    role: "system",
                    content
                },
                { role: "user", content: JSON.stringify(jobs) }
            ]
        });

        return JSON.parse(response.choices[0].message.content);
    } catch (err) {
        console.error("Error:", err);
        return [];
    }
};