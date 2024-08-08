import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

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
        "flex items-center gap-2 hover:bg-primary p-1 rounded text-gray-400 hover:text-white font-semibold transition-all w-full whitespace-nowrap",
        {
          "bg-primary text-white": isActive,
        }
      )}
    >
      <span className="p-1 bg-gray-100 rounded">{icon}</span>
      <span>{title}</span>
    </Link>
  );
};
