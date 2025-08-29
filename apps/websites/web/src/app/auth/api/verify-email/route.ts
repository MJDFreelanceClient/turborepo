// app/api/verify-email/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { WorkOS } from '@workos-inc/node';

const workos = new WorkOS(process.env.WORKOS_API_KEY!);

export async function POST(req: NextRequest) {
    try {
        const { code } = await req.json();

        const userId = 'user_01K2SN5YZK5N13Q9A5WPCF07XH';

        const result = await workos.userManagement.verifyEmail({code, userId});

        console.log('Verification success:', result);

        return NextResponse.json({ success: true, user: result.user });
    } catch (error: any) {
        console.error('Verification failed:', error);
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}