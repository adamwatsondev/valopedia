"use client";

import "./globals.css";
import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-valorantbg antialiased">
        <SidebarProvider>
          <AppSidebar />
          <main className="w-full">
            <SidebarTrigger className="sticky top-0 left-0 z-10" />
            <div className="px-40 mb-20">{children}</div>
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}
