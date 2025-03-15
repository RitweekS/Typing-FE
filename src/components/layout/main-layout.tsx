import React from "react";
import AppBar from "../app-bar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="w-screen h-screen flex flex-col">
            <AppBar />
            <div className="px-4 pt-18 pb-4 w-full h-full overflow-auto">
                {children}
            </div>
        </div>
    );
};

export default MainLayout;
