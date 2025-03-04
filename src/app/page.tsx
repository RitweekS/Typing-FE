import { NEXT_AUTH } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";

const Main = async () => {
    const session = await getServerSession(NEXT_AUTH);
    return (
        <div>
            Main
            <h1>{JSON.stringify(session)}</h1>
        </div>
    );
};

export default Main;
