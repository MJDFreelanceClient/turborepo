import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-07-30.basil',
});

// This should match your Stripe webhook secret for verification
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req:any) {
    const rawBody = await req.text();
    const sig = (await headers()).get('stripe-signature');

    let event;

    try {
        event = stripe.webhooks.constructEvent(rawBody, sig!, endpointSecret!);
    } catch (err:any) {
        console.error('Webhook signature verification failed:', err.message);
        return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
    }

    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object;
            console.log('✅ Payment complete for session:', session.id);
            // Fulfill your order here, e.g., update DB, send email, etc.
            break;

        // Add more cases as needed:
        // case 'payment_intent.succeeded':
        // case 'charge.refunded':
        // etc.

        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    return NextResponse.json({ received: true });
}
