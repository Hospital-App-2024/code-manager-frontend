import { logout } from "@/actions/auth/logout.action";
import { CiLogout } from "react-icons/ci";

export const LogoutButton = () => {
  return (
    <button
      onClick={async () => await logout()}
      className="flex items-center gap-2 hover:bg-red-500 p-1 rounded text-gray-400 hover:text-white font-semibold transition-all w-full whitespace-nowrap"
    >
      <span className="p-1 bg-gray-100 rounded">
        <CiLogout className="w-6 h-6 text-red-600" />
      </span>
      <span className="">Logout</span>
    </button>
  );
};
