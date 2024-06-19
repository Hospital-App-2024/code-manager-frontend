import { useUiStore } from "@/store/ui-store";
import { MdClose } from "react-icons/md";
import { RiMenu3Fill } from "react-icons/ri";

export const SidebarButton = () => {
  const isSideMenuOpen = useUiStore((state) => state.isSideMenuOpen);
  const toggleSideMenu = useUiStore((state) => state.toggleSideMenu);

  return (
    <button
      onClick={toggleSideMenu}
      className="absolute right-4 bottom-4 bg-primary p-3 text-white rounded-full"
    >
      {isSideMenuOpen ? (
        <MdClose className="w-6 h-6" />
      ) : (
        <RiMenu3Fill className="w-6 h-6" />
      )}
    </button>
  );
};
