"use client";
import { Button } from "@/components/ui/button";

import { signOut } from "next-auth/react";
import React from "react";

const Main = () => {
    return (
        <div>
            <Button
                onClick={async () => {
                    await signOut();
                }}
            >
                Signout
            </Button>
        </div>
    );
};

export default Main;
