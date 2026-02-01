import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { MainSidebar } from "@/app/(code)/components/MainSidebar";
import { ScrollArea } from "@/components/ui/scroll-area"
import Header from "./components/Header";

export default async function CodeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider className="h-screen w-full">
      <MainSidebar />
      <SidebarInset>
        <Header />
        <main className="w-full mt-6 px-4">
          <ScrollArea className="h-full">
            {children}
          </ScrollArea>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
