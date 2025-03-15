"use client";
import { ModeToggle } from "@/components/common/theme-button";
import SignIn from "@/components/signin";

const SignInPage = () => {
    return (
        <div className="w-full h-full flex justify-center items-center">
            <div className="absolute top-4 right-4">
                <ModeToggle />
            </div>
            <SignIn />
        </div>
    );
};
export default SignInPage;
