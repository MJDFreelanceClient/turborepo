"use client";

import { useStore } from "@tanstack/react-store";
import { modalStore } from "@/lib/modalStore";

export const ShareModal = () => {
    const file = useStore(modalStore);

    if (!file) return null; // only render if we have a file

    const handleShare = async () => {
        if (navigator.share && navigator.canShare?.({ files: [file!] })) {
            try {
                await navigator.share({
                    title: "Match Report",
                    text: "Check out this PDF!",
                    files: [file!],
                });
                modalStore.setState(undefined); // auto-close
            } catch (err) {
                console.error("Share failed:", err);
            }
        } else {
            alert("Sharing not supported, downloading instead.");
            handleDownload();
        }
    };

    const handleDownload = () => {
        const url = URL.createObjectURL(file!);
        const a = document.createElement("a");
        a.href = url;
        a.download = file!.name;
        a.click();
        URL.revokeObjectURL(url);

        modalStore.setState(undefined); // auto-close
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-xl p-6 shadow-lg">
                <h2 className="text-lg font-semibold mb-4">Your PDF is ready!</h2>
                <div className="flex gap-4">
                    <button
                        onClick={handleShare}
                        className="px-4 py-2 bg-green-600 text-white rounded"
                    >
                        Share
                    </button>
                    <button
                        onClick={handleDownload}
                        className="px-4 py-2 bg-gray-600 text-white rounded"
                    >
                        Download
                    </button>
                </div>
                <button
                    onClick={() =>
                        modalStore.setState(undefined)
                    }
                    className="mt-4 text-sm text-gray-500"
                >
                    Close
                </button>
            </div>
        </div>
    );
};