import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
    const token = await getToken({
        req,
        secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
    });

    const path = req.nextUrl.pathname;
    const res = NextResponse.next();

    if (token) {
        res.cookies.set("next-auth-session", token.customToken as string, {
            httpOnly: true,
            secure: true,
            path: "/",
            maxAge: 60 * 60 * 24,
            sameSite: "strict",
        });
    } else {
        res.cookies.delete("next-auth-session");
    }

    const isPublicPath = path === "/signin";

    if (isPublicPath && token) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL("/signin", req.url));
    }

    return res;
}

// Apply middleware to all routes
export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"], // This applies middleware to all routes dynamically
};
