// app/verify-email/page.tsx
'use client';

import { useState } from 'react';

export default function VerifyEmailPage() {
    const [code, setCode] = useState('');
    const [message, setMessage] = useState('');

    async function handleVerify(e: React.FormEvent) {
        e.preventDefault();

        const res = await fetch('/auth/api/verify-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code }),
        });

        const data = await res.json();
        if (res.ok) {
            setMessage('✅ Email verified! You are now logged in.');
        } else {
            setMessage(`❌ ${data.error}`);
        }
    }

    return (
        <main className="flex items-center justify-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleVerify}
                className="bg-white p-8 rounded-2xl shadow-md w-96 space-y-4"
            >
                <h1 className="text-xl font-semibold text-center">Verify your email</h1>

                <input
                    type="text"
                    placeholder="Enter verification code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full border rounded-md p-2"
                    required
                />

                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
                >
                    Verify
                </button>

                {message && <p className="text-center mt-2">{message}</p>}
            </form>
        </main>
    );
}
