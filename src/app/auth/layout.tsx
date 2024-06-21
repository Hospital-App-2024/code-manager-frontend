export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <main className="h-screen flex justify-center items-center bg-slate-100 p-3">
      {children}
    </main>
  );
}
