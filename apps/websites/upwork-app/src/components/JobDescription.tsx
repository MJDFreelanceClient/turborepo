"use client"

import React, {useState} from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function JobDescription({text}: {text: string}) {
    const [expanded, setExpanded] = useState(false);

    return (
       <>
           <div className={`prose prose-lg max-w-none  ${expanded ? "" : "line-clamp-4"}`}>
               <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
           </div>
           <button
               onClick={() => setExpanded(!expanded)}
               className="mt-2 text-blue-600 hover:underline font-medium"
           >
               {expanded ? "View less" : "View more"}
           </button>
       </>
    );
}