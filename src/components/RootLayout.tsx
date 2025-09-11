import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { Toaster } from "@/components/ui/sonner"

export default function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="bg-zinc-100 w-full">
       <Navbar />
       <Toaster />
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
