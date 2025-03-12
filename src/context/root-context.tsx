"use client";
import React, { createContext, useContext, useState } from "react";

interface InitialStoreValue {
    difficulty: "Easy" | "Medium" | "Hard";
    setDifficulty: React.Dispatch<
        React.SetStateAction<"Easy" | "Medium" | "Hard">
    >;
}

const RootContext = createContext<InitialStoreValue | null>(null);

export const GlobalStore = ({ children }: { children: React.ReactNode }) => {
    const [difficulty, setDifficulty] = useState<"Easy" | "Medium" | "Hard">(
        "Easy"
    );

    return (
        <RootContext.Provider value={{ difficulty, setDifficulty }}>
            {children}
        </RootContext.Provider>
    );
};

export const useGlobalStore = () => {
    const context = useContext(RootContext);
    if (!context) {
        throw new Error("useGlobalStore must be used within a GlobalStore");
    }
    return context;
};
