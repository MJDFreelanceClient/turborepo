import OpenAI from "openai";

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // set in Lambda env vars
});

export const classifyJobs = async (jobs) => {
    try {
        const response = await client.chat.completions.create({
            model: "gpt-4o-mini",
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

Important: Ignore budget, pricing, and time considerations. Focus only on skills and interest alignment.

Core skills:
- Full-stack web dev: Next.js, WordPress, Laravel, Django, ASP.NET MVC, PHP
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
`
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
    try {
        const response = await client.chat.completions.create({
            model: "gpt-4o-mini",
            temperature: 0,
            messages: [
                {
                    role: "system",
                    content: `You are an assistant that estimates the effort required for job postings.

Return only valid JSON. Do not include markdown, code fences, or any text outside the JSON.

Output must be a JSON array of objects.
Each object must have:
- "id": the job id from input
- "min": minimum hours likely required
- "max": maximum hours likely required

Important: Focus only on time estimation. Ignore budget, suitability, or skill alignment.
`
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