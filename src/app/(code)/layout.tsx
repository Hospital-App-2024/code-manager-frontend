import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { MainSidebar } from "@/app/(code)/components/MainSidebar";
import Header from "./components/Header";

export default async function CodeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider className="h-screen w-full">
      <MainSidebar />
      {/* min-w-0 deja que el contenido se encoja en vez de ensanchar la página:
          las tablas anchas se desplazan dentro de su propio contenedor. */}
      <SidebarInset className="min-w-0">
        <Header />
        <div className="min-h-0 w-full flex-1 overflow-y-auto overflow-x-hidden px-4 pt-6 pb-10">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
