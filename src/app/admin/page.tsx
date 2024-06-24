import Link from "next/link";

export default function AdminPage() {
  return (
    <div className="container flex bg-white mt-4 flex-col gap-2 py-4">
      <h1 className="text-bold text-gray-600 text-3xl">Dashboard</h1>
      <Link href="/" className="text-blue-500">
        Volver al inicio
      </Link>
    </div>
  );
}
