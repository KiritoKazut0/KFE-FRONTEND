'use client'

import React from "react";
import { usePathname } from "next/navigation";
import { NavBar } from "@/src/common/components/navbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    return (
        <div className="flex h-screen bg-[#FAFAFA] font-sans">
         
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                
               <NavBar/>

                <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                    <div className="max-w-350 mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}