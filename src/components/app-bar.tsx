import React from "react";
import { FaKeyboard } from "react-icons/fa";
import { LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { ModeToggle } from "./common/theme-button";
import { Button } from "./ui/button";
const AppBar = () => {
    const session = useSession();
    return (
        <div className="w-screen flex justify-between items-center pt-2 pb-2 pr-4 pl-4 border-b fixed top-0 bg-white dark:bg-gray-900 z-50 shadow-sm">
            <div className="flex gap-2 justify-center items-center">
                <FaKeyboard className="text-xl font-bold" />
                <p className="text-xl font-bold">Typing Master</p>
            </div>
            <div>
                <FaKeyboard className="text-xl font-bold" />
            </div>
            <div className="flex gap-2 justify-center items-center">
                <ModeToggle />
                <Button
                    variant="outline"
                    className="flex items-center gap-2 "
                    onClick={() => signOut()}
                >
                    {session.data?.user?.name}
                    <LogOut />
                </Button>
            </div>
        </div>
    );
};

export default AppBar;
