import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    const path = req.nextUrl.pathname;

    const isPublicPath = path === "/signin";

    if (isPublicPath && token) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL("/signin", req.url));
    }

    return NextResponse.next();
}

// Apply middleware to all routes
export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"], // This applies middleware to all routes dynamically
};
