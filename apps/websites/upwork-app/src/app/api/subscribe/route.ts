export async function GET() {
    const encoder = new TextEncoder();

    const stream = new ReadableStream({
        async start(controller) {
            const url = `${process.env.UPSTASH_REDIS_REST_URL}/subscribe/chat`;
            const token = process.env.UPSTASH_REDIS_REST_TOKEN!;

            // Open SSE connection to Upstash subscribe endpoint
            const res = await fetch(url, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "text/event-stream",
                },
            });

            if (!res.body) {
                controller.close();
                return;
            }

            const reader = res.body.getReader();
            const decoder = new TextDecoder();

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                // Each line of SSE is "data: ..."
                for (const line of chunk.split("\n")) {
                    if (line.startsWith("data:")) {
                        const payload = line.slice(5).trim(); // e.g. "message,chat,hello"

                        const [event, channel, ...rest] = payload.split(",");
                        const message = rest.join(",");

                        if (event === "message") {
                            console.log("Got message:", { channel, message });
                            controller.enqueue(
                                encoder.encode(`data: ${message}\n\n`)
                            );
                        } else if (event === "subscribe") {
                            console.log(`Subscribed to ${channel}`);
                        }
                    }
                }
            }

            controller.close();
        },
    });

    return new Response(stream, {
        headers: {
            "Content-Type": "text/event-stream; charset=utf-8",
            "Cache-Control": "no-cache, no-transform",
            Connection: "keep-alive",
        },
    });
}
