import { NextResponse } from 'next/server';
import {UnauthorizedException, WorkOS} from '@workos-inc/node';
import cookie from 'cookie';

const workos = new WorkOS(process.env.WORKOS_API_KEY!);

export async function POST(req: Request) {
    const { email, password } = await req.json();

    if (!email || !password) {
        return NextResponse.json(
            { error: 'Email and password are required' },
            { status: 400 }
        );
    }

    try {
        const {
            user,
            sealedSession, // encrypted session string from WorkOS
        } = await workos.userManagement.authenticateWithPassword({
            email,
            password,
            clientId: process.env.WORKOS_CLIENT_ID!,
        });

        if (!sealedSession) throw new UnauthorizedException("No session found.");

        // Set the sealed session in an HTTP-only cookie
        const res = NextResponse.json({ user }, { status: 200 });
        res.headers.append(
            'Set-Cookie',
            cookie.serialize('wos_session', sealedSession, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                path: '/',
                maxAge: 60 * 60 * 24 * 7, // 7 days
            })
        );

        return res;
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || 'Authentication failed' },
            { status: 401 }
        );
    }
}
