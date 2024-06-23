import { Sidebar } from "./components/Sidebar";

export default async function CodeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen flex">
      <Sidebar />
      <main className="bg-gray-100 w-full overflow-y-auto">{children}</main>
    </div>
  );
}
