import { SidebarTrigger } from "@/components/ui/sidebar"

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between bg-zinc-900/80 px-6 py-3 shadow-md">
      
      <div className="flex items-center">
        <SidebarTrigger className="text-white" />
      </div>

      <div className="flex items-center">
        <div className="h-9 w-9 rounded-full bg-zinc-700 flex items-center justify-center text-white font-semibold">
          U
        </div>
      </div>
    </nav>
  )
}
