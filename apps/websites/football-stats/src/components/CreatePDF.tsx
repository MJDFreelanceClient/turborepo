"use client";

import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

export default function CreatePDF() {
    const searchParams = useSearchParams();

    async function handleShareAndDownload() {
        try {
            const toastId = toast.loading(<div>
                <p className="font-semibold">Generating PDF...</p>
                <p className="text-sm opacity-80">
                    We are now generating your PDF, this may take a few seconds.
                </p></div>);
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

            toast.success("PDF ready!", { id: toastId });
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