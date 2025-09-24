import { logout } from "@/actions/auth/logout.action";
import { Button } from "@/components/ui/button";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { CiLogout } from "react-icons/ci";

export const LogoutButton = () => {
  return (
    <SidebarMenuButton
      onClick={async () => await logout()}
      tooltip={"Cerrar Sesión"}
      size="lg"
    >
      <CiLogout className="text-red-600" />
      <span className="text-red-600">
        Cerrar Sesión
      </span>
    </SidebarMenuButton>
  );
};
