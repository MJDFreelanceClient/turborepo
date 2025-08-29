"use client";

import { useSearchParams } from "next/navigation";

export default function CreatePDF() {
    const searchParams = useSearchParams();

    async function handleShareAndDownload() {
        try {
            const res = await fetch(`/api/pdf-generator?${searchParams.toString()}`);
            const blob = await res.blob();

            // Create a File for sharing
            const file = new File([blob], "report.pdf", { type: "application/pdf" });

            // --- Download ---
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "report.pdf";
            a.click();
            URL.revokeObjectURL(url);

            // --- Share (if supported) ---
            if (navigator.share && navigator.canShare?.({ files: [file] })) {
                await navigator.share({
                    title: "Match Report",
                    text: "Check out this PDF!",
                    files: [file],
                });
            } else {
                alert("Shared via download only (Web Share not supported).");
            }
        } catch (err) {
            console.error("Failed to share or download PDF", err);
        }
    }

    return (
        <div>
            <button onClick={handleShareAndDownload}>Call API</button>
        </div>
    );
}