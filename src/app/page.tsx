"use client";
import Landing from "@/components/landing";
import { useSession } from "next-auth/react";

const Main = () => {
    const session = useSession();
    console.log("session", session);

    return <Landing />;
};

export default Main;
