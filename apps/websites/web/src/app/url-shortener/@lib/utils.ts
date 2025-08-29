"use server"

export const fetchUrl = async (url: string): Promise<string> => {
    const res = await fetch(`https://cleanuri.com/api/v1/shorten`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
    })

    if (!res.ok) {
        throw new Error("Network response was not ok")
    }

    const data = await res.json()
    return data.result_url
}