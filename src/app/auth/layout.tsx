export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <main className="h-screen flex justify-center items-center p-3">
      {children}
    </main>
  );
}
