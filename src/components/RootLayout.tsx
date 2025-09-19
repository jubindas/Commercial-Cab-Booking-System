import { SidebarProvider } from "@/components/ui/sidebar";

import { AppSidebar } from "@/components/AppSidebar";

import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";

import { Toaster } from "@/components/ui/sonner";

export default function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="bg-zinc-100 w-full">
        <Navbar />
        <Toaster
          position="top-right"
          richColors
          toastOptions={{
            style: {
              zIndex: 9999,
              background: "white",
              color: "black",
              border: "1px solid #e5e7eb",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            },
          }}
        />
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
