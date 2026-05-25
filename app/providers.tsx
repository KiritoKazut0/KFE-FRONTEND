"use client";

import { HeroUIProvider, ToastProvider } from "@heroui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function Providers({ children }: Readonly<{ children: React.ReactNode }>) {
    const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            staleTime: 1000 * 30 
        }
    }
}));

    return (
        <HeroUIProvider>
            <QueryClientProvider client={queryClient}>
                <ToastProvider placement="top-right" />
                {children}
            </QueryClientProvider>
        </HeroUIProvider>
    );
}