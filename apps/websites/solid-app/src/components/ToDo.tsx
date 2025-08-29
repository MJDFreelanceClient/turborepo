// src/routes/index.tsx
import { createSignal, createResource } from "solid-js";
import { isServer } from "solid-js/web";
import { createServerData$, redirect } from "solid-start/server";
import {getTodos} from "~/lib/db";

const fetchTodos = async () => {
    if (isServer) return []; // don't run fetch during SSR
    const res = await fetch("/api/todos");
    return await res.json();
};


export const routeData = () =>
    createServerData$(() => getTodos()); // ✅ Safe and server-native

export default function ToDo() {
    const [text, setText] = createSignal("");
    const [todos, { refetch }] = createResource(fetchTodos);

    const add = async () => {
        if (!text().trim()) return;
        await fetch("/api/todos", {
            method: "POST",
            body: JSON.stringify({ text: text().trim() }),
        });
        setText("");
        refetch();
    };

    const markDone = async (id: string) => {
        await fetch("/api/todos", {
            method: "PUT",
            body: JSON.stringify({ id }),
        });
        refetch();
    };

    return (
        <main>
            <h1>My Solid Todo App</h1>
            <input value={text()} onInput={(e) => setText(e.currentTarget.value)} />
            <button onClick={add}>Add</button>

            <ul>
                {todos()?.map((todo: any) => (
                    <li>
            <span style={{ "text-decoration": todo.done ? "line-through" : "" }}>
              {todo.text}
            </span>
                        {!todo.done && <button onClick={() => markDone(todo.id)}>Done</button>}
                    </li>
                ))}
            </ul>
        </main>
    );
}
