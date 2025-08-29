import {redis} from "@/lib/redis";

export async function POST(req: Request) {
    const { channel, message } = await req.json();

    await redis.publish(channel, message);

    return Response.json({ status: "ok", channel, message });
}
