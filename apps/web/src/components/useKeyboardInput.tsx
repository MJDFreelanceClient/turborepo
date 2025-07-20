import { useEffect } from "react";

export const useKeyboardInput = (callback: (letter: string) => void, lettersOnly:boolean=true) => {
    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            const key = event.key.toUpperCase(); // Convert to uppercase to match letters
            const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

            if (!lettersOnly || alphabet.includes(key)) {
                callback(key); // Pass the key to the guess handler
            }
        };

        window.addEventListener("keydown", handleKeyPress);

        // Cleanup listener on unmount
        return () => {
            window.removeEventListener("keydown", handleKeyPress);
        };
    }, [callback]); // Re-run effect if handleGuess changes
};
