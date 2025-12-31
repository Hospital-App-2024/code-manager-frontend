import { usePathname } from "next/navigation";
import Link from "next/link";

import type { JSX } from "react";
import { SidebarMenuButton, SidebarMenuItem as SidebarItem } from "@/components/ui/sidebar";

interface Props {
  path: string;
  icon: JSX.Element;
  title: string;
}

export const SidebarMenuItem = ({ icon, path, title }: Props) => {
  const currentPath = usePathname();
  const isActive = currentPath === path;

  return (
    <SidebarItem>
      <SidebarMenuButton asChild size="lg" isActive={isActive}>
        <Link href={path}>
          {icon}
          <span>{title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarItem>
  );
};
