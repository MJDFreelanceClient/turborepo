import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-07-30.basil',
});

export async function GET(req:any) {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get('session_id');

    if (!sessionId) {
        return NextResponse.json({ error: 'Missing session_id' }, { status: 400 });
    }

    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId, {
            expand: ['payment_intent'],
        }) as any;

        return NextResponse.json({
            status: session.status,
            payment_status: session.payment_status,
            payment_intent_id: session.payment_intent?.id,
            payment_intent_status: session.payment_intent?.status,
        });
    } catch (error:any) {
        console.error('Error retrieving session:', error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}