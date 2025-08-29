import {NextRequest, NextResponse} from 'next/server';
import { WorkOS } from '@workos-inc/node';

const workos = new WorkOS(process.env.WORKOS_API_KEY);

export async function POST(req: NextRequest) {
    const { email, password } = await req.json();

    if (!email || !password) {
        return NextResponse.json(
            { error: 'Email and password are required' },
            { status: 400 }
        );
    }

    try {
        const user = await workos.userManagement.createUser({
            email,
            password,
        });

        console.log("user is", user);


        const vUser = await workos.userManagement.sendVerificationEmail({userId:user.id});
        console.log("vUser", vUser);

        const magicAuth = await workos.userManagement.createMagicAuth({
            email: 'marcelina@example.com',
        });

        console.log("magicAuth", magicAuth);

        return NextResponse.json(
            { message: 'Check your email to verify your account.' },
            { status: 201 }
        );
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
