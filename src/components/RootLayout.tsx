import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="bg-zinc-800 w-full">
       <Navbar />
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
