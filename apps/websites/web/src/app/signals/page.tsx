"use client"

import { hunger, energy, happiness } from "./@api/petState";
import { useSignal } from "./@hook/useSignal";

const Page = () => {
    const h = useSignal(hunger);
    const e = useSignal(energy);
    const ha = useSignal(happiness);

    return (
        <div style={{ fontFamily: "sans-serif", textAlign: "center" }}>
            <h1>🐶 Signal Pet</h1>
            <p>Hunger: {h}</p>
            <p>Energy: {e}</p>
            <p>Happiness: {ha}</p>

            <button className={`cursor-pointer`} onClick={() => hunger(Math.max(0, h - 10))}>Feed 🍖</button>
            <button
                onClick={() => {
                    if (e > 10) {
                        energy(e - 10);
                        happiness(ha + 10);
                        console.log("Played: Energy =", energy(), "Happiness =", happiness());
                    }
                }}
            >
                Play ⚽
            </button>
            <button className={`cursor-pointer`} onClick={() => energy(Math.min(100, e + 10))}>Rest 💤</button>
        </div>
    );
};

export default Page;