"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { X } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Filtro por rango de fechas de activación. El rango vive en la URL ("from" y "to",
// como YYYY-MM-DD): la tabla y el reporte PDF leen los mismos parámetros.
export function SearchDate() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const urlFrom = searchParams.get("from") ?? "";
  const urlTo = searchParams.get("to") ?? "";

  // Estado local para que el campo no se borre mientras la URL se actualiza.
  const [from, setFrom] = useState(urlFrom);
  const [to, setTo] = useState(urlTo);

  useEffect(() => {
    setFrom(urlFrom);
    setTo(urlTo);
  }, [urlFrom, urlTo]);

  const applyRange = (nextFrom: string, nextTo: string) => {
    if (nextFrom && nextTo && nextFrom > nextTo) {
      toast.error("La fecha \"Desde\" no puede ser posterior a \"Hasta\"");
      return;
    }

    setFrom(nextFrom);
    setTo(nextTo);

    const params = new URLSearchParams(searchParams.toString());
    if (nextFrom) params.set("from", nextFrom);
    else params.delete("from");
    if (nextTo) params.set("to", nextTo);
    else params.delete("to");
    // El rango cambia el total de resultados: se vuelve a la primera página.
    params.delete("page");

    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  };

  return (
    <div className="flex flex-wrap items-end gap-3">
      <div className="grid gap-1.5">
        <Label htmlFor="filter-from" className="text-xs text-muted-foreground">
          Desde
        </Label>
        <Input
          id="filter-from"
          type="date"
          className="w-40"
          value={from}
          max={to || undefined}
          onChange={(e) => applyRange(e.target.value, to)}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="filter-to" className="text-xs text-muted-foreground">
          Hasta
        </Label>
        <Input
          id="filter-to"
          type="date"
          className="w-40"
          value={to}
          min={from || undefined}
          onChange={(e) => applyRange(from, e.target.value)}
        />
      </div>
      {(from || to) && (
        <Button
          type="button"
          variant="outline"
          onClick={() => applyRange("", "")}
        >
          <X className="h-4 w-4" />
          Limpiar
        </Button>
      )}
    </div>
  );
}
