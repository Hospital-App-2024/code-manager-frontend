"use client";
import { MdOutlineDashboard } from "react-icons/md";
import { TbMedicalCross } from "react-icons/tb";
import { IoShieldOutline } from "react-icons/io5";
import { FaFire } from "react-icons/fa";
import { FaHelicopter } from "react-icons/fa";
import { FaRunning } from "react-icons/fa";
import { GiMovementSensor } from "react-icons/gi";
import { SidebarMenuItem } from "./SidebarMenuItem";

import { LogoutButton } from "./LogoutButton";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

const menuItems = [
  {
    path: "/",
    title: "Dashboard",
    icon: <MdOutlineDashboard className={`text-indigo-600`} />,
  },
  {
    path: "/code-blue",
    title: "Código Azul",
    icon: <TbMedicalCross className={`text-blue-600`} />,
  },
  {
    path: "/code-green",
    title: "Código Verde",
    icon: <IoShieldOutline className={`text-green-600`} />,
  },
  {
    path: "/code-red",
    title: "Código Rojo",
    icon: <FaFire className={`text-red-600`} />,
  },
  {
    path: "/code-air",
    title: "Código Aéreo",
    icon: <FaHelicopter className={`text-cyan-600`} />,
  },
  {
    path: "/code-leak",
    title: "Código Fuga",
    icon: <FaRunning className={`text-yellow-600`} />,
  },
  {
    path: "/fire-alarms",
    title: "Alarmas de Incendio",
    icon: <GiMovementSensor className={`text-indigo-600`} />,
  },
];

export const MainSidebar = () => {
  return (
    // <Sidebar collapsible="icon">
    //   <SidebarHeader />
    //   <SidebarContent>
    //     <SidebarGroup>
    //       <SidebarGroupLabel>Menú</SidebarGroupLabel>
    //       <SidebarMenu>
    //         {menuItems.map((item) => (
    //           <SidebarMenuItem key={item.path}>
    //             <SidebarMenuButton tooltip={item.title} asChild size="lg">
    //               <Link path={item.path} icon={item.icon} title={item.title} />
    //             </SidebarMenuButton>
    //           </SidebarMenuItem>
    //         ))}
    //       </SidebarMenu>
    //     </SidebarGroup>
    //   </SidebarContent>
    //   <SidebarFooter>
    //     <SidebarMenu>
    //       <SidebarMenuItem>
    //           <LogoutButton />
    //       </SidebarMenuItem>
    //     </SidebarMenu>
    //   </SidebarFooter>
    // </Sidebar>
    <Sidebar>
      <SidebarHeader>
        <div className="text-lg font-bold p-4">Code Manager</div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menú</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem
                  key={item.path}
                  path={item.path}
                  icon={item.icon}
                  title={item.title}
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <LogoutButton />
      </SidebarFooter>
    </Sidebar>
  );
};
