import { SidebarTrigger } from "@/components/ui/sidebar";

export default function Header() {
    return <header className="shadow border-b px-4 py-4 bg-sidebar">
        <SidebarTrigger />
    </header>;
}