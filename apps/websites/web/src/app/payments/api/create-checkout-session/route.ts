import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-07-30.basil',
});

export async function POST() {
    try {
        const session = await stripe.checkout.sessions.create({
            ui_mode: 'custom',
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: { name: "Custom T-shirt" },
                        unit_amount: 2000, // $20.00 (in cents)
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            return_url: `${process.env.NEXT_PUBLIC_DOMAIN}/payments/complete?session_id={CHECKOUT_SESSION_ID}`,
        });

        return NextResponse.json({ clientSecret: session.client_secret });
    } catch (error:any) {
        console.error('Error creating checkout session:', error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}