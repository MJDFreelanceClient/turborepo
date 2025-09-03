
import dotenv from 'dotenv'
//import {handler} from "./index.js";

dotenv.config()

const { classifyJobs } = await import('./openai.js')

// Jobs can come from event body, but here’s an example:
const jobs = [
    {
        "id": "job1",
        "title": "Senior Full-Stack Developer Fix Database Issues & Complete Front-Back Integration for Jewelry CRM",
        "description": "Next.js 14 + Supabase CRM, 200+ components, 150+ API endpoints, 67 services. Database fixes, API optimization, frontend-backend integration, testing. Timeline 3 weeks.",
        "value": { "type": "per project", "value": 1000.0, "currency": "USD" }
    },
    {
        "id": "job2",
        "title": "Full Stack Developer Needed for TradingView + Python Algo Trading Integration",
        "description": "Trading dashboard with TradingView Charting Library + Python backend. Secure API bridge, auth, Docker, WebSockets.",
        "value": { "type": "per project", "value": 1000.0, "currency": "USD" }
    },
    {
        "id": "job3",
        "title": "WordPress Travel Website – Redesign & Optimization",
        "description": "Full WordPress redesign, WooCommerce checkout, booking flow improvements, Stripe/PayPal integration, loyalty program, admin optimizations. Timeline 1–3 months.",
        "value": { "type": "per project", "value": 1500.0, "currency": "USD" }
    },
    {
        "id": "job4",
        "title": "Frontend Engineer (React/Next.js) for MVP Dashboard",
        "description": "Build React/Next.js dashboard with TypeScript, Tailwind, inline editing, AI-generated templates. Milestone-based contract, 3 months full-time.",
        "value": { "type": "per project", "value": 12000.0, "currency": "USD" }
    },
    {
        "id": "job5",
        "title": "Mobile application developer (iOS/Android) for VPN",
        "description": "Develop mobile VPN apps with subscription management, native or cross-platform (React Native/Flutter). Timeline 1–3 months.",
        "value": { "type": "per project", "value": 2900.0, "currency": "USD" }
    }
];

console.log(await classifyJobs(jobs))

//console.log(await handler())