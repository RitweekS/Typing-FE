import NextAuth, { Account, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";

async function customUserAdapter(
    user: User | AdapterUser,
    account: Account | null
) {
    try {
        // Call your existing API endpoint to verify/create user
        const response = await fetch(`http://localhost:8000/auth/verify`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: user.email,
                name: user.name,
                avatarUrl: user.image,
                provider: account?.provider,
            }),
        });
        if (!response.ok) {
            throw new Error("Failed to verify user");
        }

        const data = await response.json();
        return {
            ...user,
            id: data.user.id,
            customToken: data.token,
        };
    } catch (error) {
        console.error("Error in custom adapter:", error);
        throw error;
    }
}

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            try {
                console.log(
                    "user:",
                    user,
                    "account:",
                    account,
                    "profile:",
                    profile
                );
                const customUser = await customUserAdapter(user, account);
                // Store custom data in user object for later use in other callbacks
                user.id = customUser.id;
                user.customToken = customUser.customToken;
                return true;
            } catch (error) {
                console.error("Error during sign in:", error);
                return false;
            }
        },
        async jwt({ token, user }) {
            // Forward the custom token from your API to the JWT token
            if (user) {
                token.id = user.id;
                token.customToken = user.customToken;
            }
            return token;
        },
        async session({ session, token }) {
            // Add custom token to the session that will be available on the client
            if (session.user) {
                session.user.id = token.id;
                session.customToken = token.customToken;
            }
            return session;
        },
    },
    //   pages: {
    //     signIn: '/auth/signin',
    //     error: '/auth/error',
    //   },
    secret: process.env.NEXTAUTH_SECRET,
    session: { strategy: "jwt" },
});

export { handler as GET, handler as POST };
