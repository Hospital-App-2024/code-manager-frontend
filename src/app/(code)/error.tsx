"use client"; // Error components must be Client Components
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex items-center justify-center h-full rounded shadow">
      <div className="bg-white p-4 flex flex-col gap-4">
        <h1 className="text-3xl font-bold text-center text-red-500">
          oh! algo salió mal
          <p className="text-center text-gray-500 text-sm">
            {error.message || "Error al obtener los datos de la API"}
          </p>
        </h1>
        <Button
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          Intentar de nuevo
        </Button>
      </div>
    </div>
  );
}
