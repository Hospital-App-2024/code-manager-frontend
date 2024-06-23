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
    <div className="h-screen flex">
      <SidebarAdmin />
      <main className="bg-gray-100 w-full overflow-y-auto">{children}</main>
    </div>
  );
}
