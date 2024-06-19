import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const session = await getServerSession(authOptions);

  if(session && session.user) {
    redirect("/");
  }

  return (
    <main className="h-screen flex justify-center items-center bg-slate-100 p-3">
      {children}
    </main>
  );
}
