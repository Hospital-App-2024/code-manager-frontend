import { Button } from "@/components/ui/button";
import { useUiStore } from "@/store/ui-store";
import { RiMenuFold4Fill, RiMenuUnfold4Fill } from "react-icons/ri";

export const SidebarButton = () => {
  const isSideMenuOpen = useUiStore((state) => state.isSideMenuOpen);
  const toggleSideMenu = useUiStore((state) => state.toggleSideMenu);

  return (
    <div className="grid grid-cols-3 items-center py-2">
      {isSideMenuOpen && (
        <h2 className="text-xl font-bold col-span-2 text-end whitespace-nowrap">
          Code Manger
        </h2>
      )}
      <div className="text-end">
        <Button onClick={toggleSideMenu} variant="outline" size="icon">
          {isSideMenuOpen ? (
            <RiMenuUnfold4Fill className="w-6 h-6" />
          ) : (
            <RiMenuFold4Fill className="w-6 h-6" />
          )}
        </Button>
      </div>
    </div>
  );
};
