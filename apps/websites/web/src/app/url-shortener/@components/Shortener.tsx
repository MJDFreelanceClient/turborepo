"use client"

import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useForm } from "@tanstack/react-form"
import { useState } from "react"
import {fetchUrl} from "@/app/url-shortener/@lib/utils";

export const Shortener = () => {
    const queryClient = useQueryClient()
    const [submittedUrl, setSubmittedUrl] = useState("")
    const [copied, setCopied] = useState<string | null>(null)

    const useShorten = (query: string) =>
        useQuery({
            queryKey: ["shorten", query],
            queryFn: () => fetchUrl(query),
            enabled: !!query,
            staleTime: 5 * 60 * 1000, // 5 minutes
        })

    const searchQuery = useShorten(submittedUrl)

    const form = useForm({
        defaultValues: { url: "" },
        onSubmit: ({ value }) => {
            setSubmittedUrl(value.url)
        },
    })

    const cachedSearches = queryClient.getQueriesData({ queryKey: ["shorten"] })

    return (
        <article className={`flex flex-col gap-6`}>
            <form className={`-mt-20 bg-purple-600 text-white flex max-md:flex-col gap-4 p-6 md:px-16 md:py-12 rounded-[5px]`}
                onSubmit={(e) => {
                    e.preventDefault()
                    form.handleSubmit(e)
                }}
            >
                <form.Field name="url">
                    {(field) => (
                        <input className={`flex-1 bg-white text-purple-900 text-mobile-4 py-2 px-4 rounded-[5px]`}
                            onChange={(e) => field.handleChange(e.target.value)}
                            value={field.state.value}
                            type="text"
                            placeholder="Enter your long link here"
                        />
                    )}
                </form.Field>
                <button type="submit" className={`px-10 bg-primary py-3 rounded-[5px] text-mobile-3`}>Shorten It!</button>
            </form>

            {/*{searchQuery.isLoading && <p>Loading...</p>}
            {searchQuery.isError && (
                <p style={{ color: "red" }}>Error: {searchQuery.error.message}</p>
            )}
            {searchQuery.data && (
                <p>
                    <strong>Shortened URL:</strong> {searchQuery.data}
                </p>
            )}*/}

            {/*<pre>{JSON.stringify(cachedSearches, null, 2)}</pre>*/}

            <div className={`flex flex-col gap-6`}>
                {cachedSearches.filter(search=>search[0][1].length>0).map(([key, data]) => {
                    const fullUrl = key[1] as string
                    const shortUrl = data as string
                    return (
                        <div key={fullUrl} className={`bg-white`}>
                            <h4>{fullUrl}</h4>
                            <p>{shortUrl}</p>
                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText(shortUrl)
                                    setCopied(shortUrl)
                                    setTimeout(() => setCopied(null), 2000)
                                }}
                            >
                                {copied === shortUrl ? "Copied!" : "Copy"}
                            </button>
                        </div>
                    )
                })}
            </div>
        </article>
    )
}
