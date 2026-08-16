"use client";
import { MdOutlineDashboard } from "react-icons/md";
import { cn } from "@/lib/utils";
import { SidebarMenuItem } from "./SidebarMenuItem";
import { useUiStore } from "@/store/ui-store";
import { FaUsers, FaBuildingUser } from "react-icons/fa6";
import { Menu, LogOut, ChevronLeft } from "lucide-react";
import { logout } from "@/actions/auth/logout.action";

const className = "w-5 h-5";

const menuItems = [
  {
    path: "/admin",
    title: "Dashboard",
    icon: <MdOutlineDashboard className={className} />,
  },
  {
    path: "/admin/users",
    title: "Usuarios",
    icon: <FaUsers className={className} />,
  },
  {
    path: "/admin/operators",
    title: "Operadores",
    icon: <FaBuildingUser className={className} />,
  },
];

export const SidebarAdmin = () => {
  const isSideMenuOpen = useUiStore((state) => state.isSideMenuOpen);
  const toggleSideMenu = useUiStore((state) => state.toggleSideMenu);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button 
        onClick={toggleSideMenu} 
        className={cn(
          "fixed top-4 left-4 z-50 p-2.5 rounded-xl transition-all duration-300 shadow-lg md:hidden",
          isSideMenuOpen ? "bg-slate-800 text-white" : "bg-white text-slate-800 hover:bg-slate-100"
        )}
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Sidebar Container */}
      <aside
        className={cn(
          "fixed md:relative z-40 h-screen bg-[#0B1120] border-r border-slate-800/60 shadow-2xl transition-all duration-500 ease-in-out flex flex-col",
          isSideMenuOpen ? "w-64 translate-x-0" : "-translate-x-full md:translate-x-0 md:w-20"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-20 px-4 mb-4 border-b border-slate-800/40">
          <div className={cn("flex items-center gap-3 transition-opacity duration-300", 
            !isSideMenuOpen && "md:opacity-0 md:w-0 overflow-hidden"
          )}>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <span className="font-bold text-white text-lg tracking-tight">Code<span className="text-blue-500">Manager</span></span>
          </div>

          <button onClick={toggleSideMenu} className="hidden md:flex p-1.5 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">
             <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-2 space-y-2 overflow-x-hidden">
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.path} {...item} />
          ))}
        </nav>

        {/* Footer / Logout */}
        <div className="p-3 mt-auto mb-4 border-t border-slate-800/40 pt-4">
          <button
            onClick={async () => await logout()}
            className={cn(
              "group flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-all w-full overflow-hidden",
              "text-red-400 hover:text-white hover:bg-red-500/10 hover:border-red-500/20 border border-transparent"
            )}
          >
            <div className="p-2 rounded-lg bg-red-500/10 text-red-400 group-hover:bg-red-500 group-hover:text-white transition-all duration-300 group-hover:scale-110">
              <LogOut className="w-5 h-5" />
            </div>
            <span className={cn("whitespace-nowrap transition-opacity", !isSideMenuOpen && "md:opacity-0")}>
              Cerrar Sesión
            </span>
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isSideMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-30 md:hidden"
          onClick={toggleSideMenu}
        />
      )}
    </>
  );
};
