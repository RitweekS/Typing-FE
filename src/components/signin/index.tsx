import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { FaKeyboard } from "react-icons/fa";

const SignIn = () => {
    return (
        <Card className="w-[350px]">
            <CardHeader className="flex items-center gap-2">
                <FaKeyboard className="text-4xl font-bold" />
                <CardTitle className="text-2xl font-bold">
                    Typing Master
                </CardTitle>
                <CardDescription className="text-center font-semibold">
                    Boost your typing speed with real-time practice.
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col justify-center items-center ">
                <Button
                    variant="outline"
                    className="flex items-center gap-2 "
                    onClick={async () => {
                        await signIn("google", { callbackUrl: "/" });
                    }}
                >
                    <FcGoogle className="w-5 h-5" />
                    Sign in with Google
                </Button>
            </CardContent>
        </Card>
    );
};

export default SignIn;
