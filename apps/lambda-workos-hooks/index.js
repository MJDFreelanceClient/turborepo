// handler.js
import { WorkOS } from '@workos-inc/node';
import { Resend } from 'resend';

const workos = new WorkOS(process.env.WORKOS_API_KEY);
const resend = new Resend(process.env.RESEND_API_KEY);

export async function handler(event) {
    console.log('Received event:', JSON.stringify(event, null, 2));

    try {
        // Parse body
        const body = event.body ? JSON.parse(event.body) : {};
        const workosEvent = body; // WorkOS sends JSON with { event, data }

        // Optional: verify webhook signature (recommended in prod)
        // const sigHeader = event.headers['workos-signature'];
        // workos.webhooks.constructEvent(event.body, sigHeader, process.env.WORKOS_WEBHOOK_SECRET);

        if (workosEvent.event === 'email_verification.created') {
            const { id: emailVerificationId, email } = workosEvent.data;

            // 1. Get the verification code
            const verification = await workos.userManagement.getEmailVerification(emailVerificationId);

            console.log('Verification object:', verification);

            // 2. Send the code via Resend
            await resend.emails.send({
                from: 'no-reply@michaeljdfreelance.com',
                to: email,
                subject: 'Verify your email',
                html: `<p>Your verification code is <strong>${verification.code}</strong></p>`,
            });

            console.log('Sent verification email to', email);
        }

        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ success: true }),
        };
    } catch (err) {
        console.error('Error handling WorkOS webhook:', err);
        return {
            statusCode: 500,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: 'Internal Server Error' }),
        };
    }
};
