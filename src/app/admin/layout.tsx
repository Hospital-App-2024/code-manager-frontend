import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { SidebarAdmin } from "./components/sidebar/SidebarAdmin";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (session?.user.role !== "Admin" && !session) {
    return redirect("/");
  }

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden selection:bg-blue-500/30">
      <SidebarAdmin />
      <main className="flex-1 overflow-y-auto relative w-full">
        {/* Decorative Background Gradients */}
        <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-blue-500/5 to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-400/5 rounded-full blur-3xl pointer-events-none translate-x-1/3 -translate-y-1/3" />
        
        <div className="relative z-10 p-6 md:p-10 min-h-full">
          {children}
        </div>
      </main>
    </div>
  );
}
