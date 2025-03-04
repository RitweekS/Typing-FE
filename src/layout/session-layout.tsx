"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { usePathname } from "next/navigation";
import MainLayout from "@/components/layout/main-layout";

const SessionLayout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <SessionProvider>
                {pathname === "/signin" ? (
                    <div className="w-screen h-screen">{children}</div>
                ) : (
                    <MainLayout>{children}</MainLayout>
                )}
            </SessionProvider>
        </ThemeProvider>
    );
};

export default SessionLayout;
