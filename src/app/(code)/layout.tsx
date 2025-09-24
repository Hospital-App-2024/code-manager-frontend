import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { MainSidebar } from "@/app/(code)/components/MainSidebar";
import Header from "./components/Header";

export default async function CodeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider className="h-screen overflow-x-hidden">
      <MainSidebar />
      <SidebarInset>
        <Header />
        <main className="container md:px-4 mx-auto">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
