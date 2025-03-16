import { Account, AuthOptions, Session, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";

// Extend the User type
interface CustomUser extends User {
    id: string;
    customToken?: string;
}

// Extend the JWT type
interface CustomToken extends JWT {
    id?: string;
    customToken?: string;
}

// Extend the Session type
declare module "next-auth" {
    interface Session {
        user: CustomUser;
        customToken?: string;
    }
}

async function customUserAdapter(
    user: User | AdapterUser,
    account: Account | null
): Promise<CustomUser> {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/verify`,
            {
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
            }
        );
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

export const NEXT_AUTH: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        async signIn({ user, account }) {
            try {
                const customUser = await customUserAdapter(user, account);

                (user as CustomUser).id = customUser.id;
                (user as CustomUser).customToken = customUser.customToken;

                return true;
            } catch (error) {
                console.error("Error during sign in:", error);
                return false;
            }
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = (user as CustomUser).id;
                token.customToken = (user as CustomUser).customToken;
            }
            return token as CustomToken;
        },
        async session({
            session,
            token,
        }: {
            session: Session;
            token: CustomToken;
        }) {
            if (session.user) {
                session.user.id = token.id || "";
                session.user.customToken = token.customToken;
            }
            return session;
        },
    },
    pages: {
        signIn: "/signin",
    },
    secret: process.env.NEXTAUTH_SECRET!,
    session: { strategy: "jwt" },
};
