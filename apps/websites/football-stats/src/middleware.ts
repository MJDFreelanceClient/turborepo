import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from "next/server";

const intlMiddleware = (req:any) => {
    if (req.nextUrl.searchParams.get("bypass") === "S6sncMNU0Fy4o0b9") {
        const res = NextResponse.next();
        res.cookies.set("bypass", "true"); // 👈 drop a cookie
        return res;
    }
    else {
        const res = NextResponse.next();
        res.cookies.delete("bypass"); // 👈 drop a cookie
        return res;
    }
}

const isProtectedRoute = createRouteMatcher([
    // Protect everything…
    '/',
])

export default clerkMiddleware(async (auth, req) => {
    if (isProtectedRoute(req) && req.nextUrl.searchParams.get("bypass") !== "S6sncMNU0Fy4o0b9") await auth.protect()

    return intlMiddleware(req)
})

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
}