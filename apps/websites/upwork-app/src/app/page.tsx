"use client";

import { useEffect, useState } from "react";

export default function Home() {
    const [messages, setMessages] = useState<string[]>([]);
    const [input, setInput] = useState("");

    /*useEffect(() => {
        const es = new EventSource("/api/subscribe");
        es.onmessage = (e) => setMessages((prev) => [...prev, e.data]);
        return () => es.close();
    }, []);

    async function sendMessage() {
        await fetch("/api/publish", {
            method: "POST",
            body: JSON.stringify({ channel: "chat", message: input }),
            headers: { "Content-Type": "application/json" },
        });
        setInput("");
    }*/

    return (
        <div className="p-4">
      {/*      <div className="mb-4">
                {messages.map((m, i) => (
                    <div key={i}>{m}</div>
                ))}
            </div>*/}
       {/*     <input
                className="border p-2"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />*/}
            {/*<button className="ml-2 px-3 py-1 bg-blue-500 text-white" onClick={sendMessage}>
                Send
            </button>*/}
        </div>
    );
}
