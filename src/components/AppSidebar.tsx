import {  MapPinned , Home, Search, Settings, MapPin } from "lucide-react";
import { NavLink } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const items = [
  { title: "Home", url: "/", icon: Home },
  { title: "Location", url: "/location", icon: MapPin },
  { title: "Pin Code", url: "/pincode", icon: MapPinned  },
  { title: "Search", url: "/search", icon: Search },
  { title: "Settings", url: "/settings", icon: Settings },
];



export function AppSidebar() {
  return (
    <Sidebar className="bg-[#1B1B1E] text-zinc-100 border-r border-zinc-800 shadow-xl">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-zinc-400 tracking-wide uppercase text-xs px-2 py-3">
            Application
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <NavLink
                    to={item.url}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-all duration-200
                      ${
                        isActive
                          ? "bg-purple-600 text-white hover:bg-purple-500" 
                          : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                      }`
                    }
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.title}</span>
                  </NavLink>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
