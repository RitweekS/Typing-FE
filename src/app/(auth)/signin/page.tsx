"use client";
import { signIn } from "next-auth/react";

const SignIn = () => {
    return (
        <div>
            <button
                onClick={async () => {
                    await signIn("google", { callbackUrl: "/" });
                }}
            >
                Login with google
            </button>

            <br />
        </div>
    );
};
export default SignIn;
