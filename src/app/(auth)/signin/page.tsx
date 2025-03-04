"use client";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

const SignIn = () => {
    return (
        <div>
            <Button
                onClick={async () => {
                    await signIn("google", { callbackUrl: "/" });
                }}
            >
                Login with google
            </Button>
        </div>
    );
};
export default SignIn;
