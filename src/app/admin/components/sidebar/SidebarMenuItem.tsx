import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { JSX } from "react";

interface Props {
  path: string;
  icon: JSX.Element;
  title: string;
}

export const SidebarMenuItem = ({ icon, path, title }: Props) => {
  const currentPath = usePathname();
  const isActive = currentPath === path;

  return (
    <Link
      href={path}
      className={cn(
        "group flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-all duration-300 w-full overflow-hidden relative",
        isActive
          ? "bg-gradient-to-r from-blue-600/90 to-blue-500/80 text-white shadow-md shadow-blue-500/20"
          : "text-slate-400 hover:text-white hover:bg-slate-800/50"
      )}
    >
      <div
        className={cn(
          "p-2 rounded-lg transition-transform duration-300 group-hover:scale-110",
          isActive ? "bg-white/20 text-white" : "bg-slate-800/80 text-slate-400 group-hover:text-white group-hover:bg-slate-700/80"
        )}
      >
        {icon}
      </div>
      <span className="whitespace-nowrap tracking-wide text-sm">{title}</span>
      {isActive && (
        <div className="absolute left-0 top-0 h-full w-1 bg-white rounded-r-full shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
      )}
    </Link>
  );
};
