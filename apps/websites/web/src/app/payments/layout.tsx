"use client"

import React, {useEffect} from "react";
import {loadStripe} from '@stripe/stripe-js';
import {
    CheckoutProvider
} from '@stripe/react-stripe-js';


// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
// This test secret API key is a placeholder. Don't include personal details in requests with this key.
// To see your test secret API key embedded in code samples, sign in to your Stripe account.
// You can also find your test secret API key at https://dashboard.stripe.com/test/apikeys.
const stripePromise = loadStripe("pk_test_51RwnjX2YH9XlbXNPmLz0cpd7AJhbnDvx2NbjXjvPtPMTOiYxjHSFl11lnjoqcDwViUdvwLcCcUsy5goejbwTTPL000LeMRL82K");

const App = ({children}:{children:ReactNode}) => {
    const [clientSecret, setClientSecret] = React.useState<any | null>(null);

    useEffect(() => {
        fetch("/payments/api/create-checkout-session", { method: "POST" })
            .then((res) => res.json())
            .then((data) => {
                console.log("API returned:", data); // helpful for debugging

                setClientSecret(data.clientSecret);
            });
    }, []);

    const appearance = {
        theme: 'stripe',
    } as {
        theme: "flat" | "stripe" | "night" | undefined
    };

    if (!clientSecret) return <div>Loading checkout…</div>;

    return (
        <div className="App">
            Test
            <CheckoutProvider
                stripe={stripePromise}
                options={{
                    fetchClientSecret:() => Promise.resolve(clientSecret!),
                    elementsOptions: {appearance},
                }}
            >
                2
                {children}
            </CheckoutProvider>
        </div>
    )
}

export default App;