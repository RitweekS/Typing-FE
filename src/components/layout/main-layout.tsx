import React from "react";
import AppBar from "../app-bar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="w-screen h-screen flex flex-col">
            <AppBar />
            {children}
        </div>
    );
};

export default MainLayout;
