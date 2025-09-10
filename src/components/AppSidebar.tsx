import { useState } from "react";
import {
  MapPinned,
  Home,
  LayoutGrid,
  MapPin,
  ChevronRight,
  ChevronDown,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

interface MenuItem {
  title: string;
  url?: string;
  icon?: LucideIcon;
  children?: MenuItem[];
}

const items: MenuItem[] = [
  { title: "Home", url: "/", icon: Home },
  { title: "Location", url: "/location", icon: MapPin },
  { title: "Pin Code", url: "/pincode", icon: MapPinned },
  {
    title: "Service",
    icon: LayoutGrid,
    children: [
      { title: "Main Category", url: "/main-category" },
      { title: "Sub Category", url: "/sub-category" },
    ],
  },
];

export function AppSidebar() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
  const location = useLocation();

  const toggleMenu = (title: string) => {
    setOpenMenu(openMenu === title ? null : title);
    setOpenSubMenu(null);
  };

  const toggleSubMenu = (title: string) => {
    setOpenSubMenu(openSubMenu === title ? null : title);
  };

  const isParentActive = (item: MenuItem) => {
    if (!item.children) return false;
    return item.children.some(
      (child) => location.pathname === child.url
    );
  };

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
                  {item.children ? (
                    <>
                      <button
                        onClick={() => toggleMenu(item.title)}
                        className={`flex items-center justify-between w-full gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-all duration-200 ${
                          isParentActive(item)
                            ? "bg-purple-600 text-white"
                            : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {item.icon && <item.icon className="h-5 w-5" />}
                          <span>{item.title}</span>
                        </div>
                        {openMenu === item.title ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </button>

                      {openMenu === item.title && item.children && (
                        <div className="ml-10 mt-1 space-y-1">
                          {item.children.map((child) =>
                            child.children ? (
                              <div key={child.title}>
                                <button
                                  onClick={() => toggleSubMenu(child.title)}
                                  className="flex items-center justify-between w-full text-sm text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg px-3 py-2"
                                >
                                  {child.title}
                                  {openSubMenu === child.title ? (
                                    <ChevronDown className="h-3 w-3" />
                                  ) : (
                                    <ChevronRight className="h-3 w-3" />
                                  )}
                                </button>

                                {openSubMenu === child.title &&
                                  child.children && (
                                    <div className="ml-6 mt-1 space-y-1">
                                      {child.children.map((sub) => (
                                        <NavLink
                                          key={sub.title}
                                          to={sub.url ?? "#"}
                                          className={({ isActive }) =>
                                            `block rounded-lg px-3 py-1.5 text-sm transition ${
                                              isActive
                                                ? "bg-purple-600 text-white"
                                                : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                                            }`
                                          }
                                        >
                                          {sub.title}
                                        </NavLink>
                                      ))}
                                    </div>
                                  )}
                              </div>
                            ) : (
                              <NavLink
                                key={child.title}
                                to={child.url ?? "#"}
                                className={({ isActive }) =>
                                  `block rounded-lg px-3 py-2 text-sm transition ${
                                    isActive
                                      ? "bg-purple-600 text-white"
                                      : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                                  }`
                                }
                              >
                                {child.title}
                              </NavLink>
                            )
                          )}
                        </div>
                      )}
                    </>
                  ) : (
                    <NavLink
                      to={item.url ?? "#"}
                      className={({ isActive }) =>
                        `flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-all duration-200 ${
                          isActive
                            ? "bg-purple-600 text-white"
                            : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                        }`
                      }
                    >
                      {item.icon && <item.icon className="h-5 w-5" />}
                      <span>{item.title}</span>
                    </NavLink>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
