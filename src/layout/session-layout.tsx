"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { usePathname } from "next/navigation";
import MainLayout from "@/components/layout/main-layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

const SessionLayout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <QueryClientProvider client={queryClient}>
                <Toaster />
                <SessionProvider>
                    {pathname === "/signin" ? (
                        <div className="w-screen h-screen">{children}</div>
                    ) : (
                        <MainLayout>{children}</MainLayout>
                    )}
                </SessionProvider>
            </QueryClientProvider>
        </ThemeProvider>
    );
};

export default SessionLayout;
