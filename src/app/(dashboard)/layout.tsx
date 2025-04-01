"use client";
import type React from "react";
import Sidebar from "@/components/global/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className=" flex h-screen flex-row bg-gradient-to-br from-[#090809] to-[#0a0a0a] justify-between">
    <Sidebar/>
    <div className=" w-[calc(100%-256px)] h-screen">
   
    
    <ScrollArea className="w-full h-screen">
       {children}
       </ScrollArea>
       </div>

  
   </div>
  );
}
