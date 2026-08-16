import { logout } from "@/actions/auth/logout.action";

import { CiLogout } from "react-icons/ci";

export const LogoutButton = () => {
  return (
    <div className="px-3 mt-auto mb-4">
      <button
        onClick={async () => await logout()}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md text-red-600 hover:bg-red-50 hover:text-red-700 w-full transition-colors"
      >
        <CiLogout className="w-5 h-5" />
        <span className="">Cerrar Sesión</span>
      </button>
    </div>
  );
};
