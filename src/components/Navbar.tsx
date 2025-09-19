import { SidebarTrigger } from "./ui/sidebar";

import { User, LogOut } from "lucide-react";

import { useAuth } from "@/hooks/useAuth";

import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const goToProfile = () => {
    navigate("/profile");
  };

  return (
    <nav className="sticky top-0 bg-zinc-100/40 backdrop-blur-md px-6 py-3 h-[69px] shadow-lg flex items-center justify-between gap-4 z-50">
      <div className="flex items-center gap-3">
        <SidebarTrigger className="text-black hover:text-zinc-300 transition-colors" />
      </div>

      <div className="flex items-center gap-3">
        <div
          onClick={goToProfile}
          className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-400 rounded-full flex items-center justify-center text-white font-semibold cursor-pointer hover:opacity-90"
        >
          <User className="h-5 w-5" />
        </div>

        {user && (
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-lg bg-red-500 px-3 py-2 text-sm font-medium text-white shadow hover:bg-red-600 transition"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
