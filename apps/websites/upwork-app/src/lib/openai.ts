"use server"

import OpenAI from "openai";

export const getReccomendation = async (job) => {
    const client = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY, // set in Lambda env vars
    });

    const response = await client.chat.completions.create({
        model: "gpt-5", // match Playground choice
        messages: [
            {
                role: "system",
                content: `You are analyzing freelance job postings (e.g., from Upwork) to help a freelancer decide how to pitch proposals.  
You will receive a JSON object describing the job post.  

Input format:
{
  "job_post": {
    "description": "string",
    "questions": ["string", "string"],
    "budget": "string (optional)",
    "experience_level": "string (optional)",
    "duration": "string (optional)"
  }
}

Your task: analyze the job post and return your insights in the following JSON format:

{
  "tone_and_priorities": [
    "brief bullet point about tone",
    "bullet points about client priorities"
  ],
  "client_persona": [
    "bullet points about how tech-savvy or involved the client seems",
    "bullet points about whether they want someone to take charge, collaborate, or just execute tasks"
  ],
  "your_best_tone": [
    "bullet points recommending the communication style to use in the proposal",
    "why this tone will resonate with the client"
  ],
  "on_client_questions": [
    "bullet points explaining what the client’s questions reveal about their concerns (if any)",
    "if no questions are included, return an empty array"
  ]
}

`
            },
            {
                role: "user",
                content: JSON.stringify(job)
            }
        ],
    });

    return response.choices[0].message.content;
}