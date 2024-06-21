import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Sidebar } from "./components/Sidebar";

export default async function CodeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  if (!session || !session.user) {
    redirect("/auth/login");
  }

  return (
      <div className="h-screen flex">
        <Sidebar />
        <main className="bg-gray-100 w-full overflow-y-auto">
        {children}
        </main>
      </div>
  );
}
