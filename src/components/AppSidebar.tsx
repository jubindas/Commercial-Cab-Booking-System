import { useState, useEffect } from "react";

import {  MapPinned,  Home,  LayoutGrid,  MapPin,  ChevronRight,  ChevronDown } from "lucide-react";

import type { LucideIcon } from "lucide-react";

import { NavLink, useLocation } from "react-router-dom";

import {  Sidebar,  SidebarContent,  SidebarGroup,  SidebarGroupLabel,  SidebarGroupContent,  SidebarMenu,  SidebarMenuItem } from "@/components/ui/sidebar";

interface MenuItem {
  title: string;
  url?: string;
  icon?: LucideIcon;
  count?: number;
  children?: MenuItem[];
}

const items: MenuItem[] = [
  { title: "Home", url: "/", icon: Home },
  {
    title: "Location",
    icon: MapPin,
    children: [
      { title: "State", url: "/state" },
      { title: "District", url: "/district" },
      { title: "City", url: "/city" },
      { title: "Area", url: "/location" },
      { title: "Pin Code", url: "/pincode" },
    ],
  },
  {
    title: "Service",
    icon: LayoutGrid,
    children: [
      { title: "Main Category", url: "/main-category" },
      { title: "Sub Category", url: "/sub-category" },
    ],
  },
  { title: "Vendor", url: "/vendor", icon: MapPinned },
];

export function AppSidebar() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const activeParent = items.find(
      (item) =>
        item.children &&
        item.children.some((child) => location.pathname === child.url)
    );
    if (activeParent) {
      setOpenMenu(activeParent.title);
    }
  }, [location.pathname]);

  const toggleMenu = (title: string) => {
    setOpenMenu((prev) => (prev === title ? null : title));
  };

  const isParentActive = (item: MenuItem) => {
    if (!item.children) return false;
    return item.children.some((child) => location.pathname === child.url);
  };

  return (
    <Sidebar className="bg-black text-zinc-200 w-64 min-h-screen border-r border-zinc-800">
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
                        className={`flex items-center justify-between w-full gap-3 px-3 py-2 text-sm transition ${
                          isParentActive(item) || openMenu === item.title
                            ? "bg-zinc-800 text-white"
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
                        <div className="ml-3 mt-1 space-y-1 border-l border-zinc-800 pl-2">
                          {item.children.map((child) => (
                            <NavLink
                              key={child.title}
                              to={child.url ?? "#"}
                              className={({ isActive }) =>
                                `flex items-center justify-between px-3 py-1.5 text-sm rounded-md transition
                                ${
                                  isActive
                                    ? "bg-zinc-800 text-white border-l-2 border-purple-500"
                                    : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                                }`
                              }
                            >
                              <span>{child.title}</span>
                              {child.count && (
                                <span className="ml-auto inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-zinc-700 px-2 text-xs font-medium text-zinc-100">
                                  {child.count}
                                </span>
                              )}
                            </NavLink>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <NavLink
                      to={item.url ?? "#"}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2 text-sm transition ${
                          isActive
                            ? "bg-zinc-800 text-white"
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
