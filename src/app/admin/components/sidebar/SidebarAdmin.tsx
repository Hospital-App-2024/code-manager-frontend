"use client";
import { MdOutlineDashboard } from "react-icons/md";
import { TbMedicalCross } from "react-icons/tb";
import { cn } from "@/lib/utils";
import { SidebarMenuItem } from "./SidebarMenuItem";
import { useUiStore } from "@/store/ui-store";
import { LogoutButton } from "@/app/(code)/components/LogoutButton";
import { SidebarButton } from "@/app/(code)/components/SidebarButton";
import { FaUsers } from "react-icons/fa6";
import { FaBuildingUser } from "react-icons/fa6";

const className = "w-6 h-6";

const menuItems = [
  {
    path: "/admin",
    title: "Dashboard",
    icon: <MdOutlineDashboard className={`text-indigo-600 ${className}`} />,
  },
  {
    path: "/admin/users",
    title: "Usuarios",
    icon: <FaUsers className={`text-blue-600 ${className}`} />,
  },
  {
    path: "/admin/operators",
    title: "Operadores",
    icon: <FaBuildingUser className={`text-orange-600 ${className}`} />,
  },
];

export const SidebarAdmin = () => {
  const isSideMenuOpen = useUiStore((state) => state.isSideMenuOpen);
  return (
    <>
      <SidebarButton />
      <aside
        className={cn("p-2 shadow-lg w-14 bg-background transition-all", {
          "w-60": isSideMenuOpen,
        })}
      >
        <div className="w-full overflow-hidden flex flex-col h-full">
          <div className="w-full flex justify-center">
            <span
              className={cn(
                "font-bold py-4 block text-center whitespace-nowrap transition-all",
                {
                  "opacity-0": !isSideMenuOpen,
                }
              )}
            >
              Admin Panel
            </span>
          </div>
          <nav className="flex-1 space-y-2">
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.path} {...item} />
            ))}
          </nav>
          <LogoutButton />
        </div>
      </aside>
    </>
  );
};
