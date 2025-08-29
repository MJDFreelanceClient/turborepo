// file: index.mjs (or package.json with "type": "module")
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const handler = async (event) => {
    const sig = event.headers["stripe-signature"];
    let rawBody = event.body;

    // If API Gateway sends the body base64-encoded, decode it
    if (event.isBase64Encoded) {
        rawBody = Buffer.from(rawBody, "base64").toString("utf8");
    }

    let eventObj;
    try {
        eventObj = stripe.webhooks.constructEvent(
            rawBody,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        console.error("⚠️ Webhook signature verification failed.", err.message);
        return {
            statusCode: 400,
            body: `Webhook Error: ${err.message}`,
        };
    }

    // Handle the event
    switch (eventObj.type) {
        case "payment_intent.succeeded": {
            const paymentIntent = eventObj.data.object;
            console.log(`💰 PaymentIntent successful: ${paymentIntent.id}`);
            // TODO: mark order paid, update DB, etc.
            break;
        }
        case "charge.failed":
            console.log("❌ Charge failed");
            break;
        default:
            console.log(`ℹ️ Unhandled event type ${eventObj.type}`);
    }

    return { statusCode: 200, body: "Success" };
};
