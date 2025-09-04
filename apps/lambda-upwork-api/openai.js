import OpenAI from "openai";

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // set in Lambda env vars
});

export const classifyJobs = async (jobs) => {
    try {

        const response = await client.chat.completions.create({
            model: "gpt-4o-mini", // match Playground choice
            temperature: 0,
            messages: [
                {
                    role: "system",
                    content: `You are an assistant that classifies job postings for suitability.

Return only valid JSON. Do not include markdown, code fences, or any text outside the JSON.

Output must be a JSON array of objects.
Each object must have:
- "id": the job id from input
- "decision": "hit" or "miss"
- "reason": a short explanation (<20 words)
- "timeEstimate": rough hours required (e.g. "20-40h", "100h-200h", "300h+")
- "impliedRate": numeric USD/hour based on fixed price ÷ hours (omit if hourly job)

Use this profile when deciding suitability:

Core skills:
- Full-stack web dev: Next.js, WordPress, Laravel, Django, ASP.NET MVC, PHP
- Frontend: JavaScript (vanilla + frameworks), TypeScript, GTM
- Cloud & infra: AWS, Azure, GCP, Cloudflare
- CI/CD pipelines and infra architecture at enterprise scale
- Automation and problem-solving
- Comfortable with UI tweaks, but not full Figma builds

Interests:
- Building scalable web platforms, dashboards, booking systems, ecommerce
- Automation-heavy projects
- AI integrations and workflow automation (stretch area)
- Open to AI projects for learning/growth

Not suitable:
- Blockchain/crypto/NFTs
- Mobile-only projects (iOS, Android, Flutter, React Native)
- Embedded/firmware/hardware development
- Pure design or content writing

Budget rules (fixed-price jobs):
- Estimate fixed-price jobs duration in hours from description. For hourly jobs, ignore total duration and budget calculations.
- impliedRate = fixed price ÷ estimated hours.
- If fixed price < $7,000 → divide by max hours (pessimistic).
- If fixed price ≥ $7,000 → divide by min hours (optimistic).
- If impliedRate ≤ 10, always return "decision": "miss" (budget too low).
- Budget rules override skill/interest alignment — never return "hit" if budget too low.

It is acceptable to return all "miss" if none of the jobs are suitable.

`
                },
                {
                    role: "user",
                    content: JSON.stringify(jobs)
                }
            ],
        });

        const result = response.choices[0].message.content;

        // Return parsed JSON
        return JSON.parse(result)

    } catch (err) {
        console.error("Error:", err);
        return []
    }
};
