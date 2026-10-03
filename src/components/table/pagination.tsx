"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
    currentPage: number;
    totalPages: number;
}

const DEFAULT_LIMIT = 5;
const PAGE_SIZES = [5, 10, 20, 50, 100];

export function Pagination({ currentPage, totalPages }: Props) {

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Sin resultados el backend informa 0 páginas: se muestra 1 de 1.
  const lastPage = Math.max(totalPages, 1)
  const limit = Number(searchParams.get("limit")) || DEFAULT_LIMIT
  const pageSizes = PAGE_SIZES.includes(limit)
    ? PAGE_SIZES
    : [...PAGE_SIZES, limit].sort((a, b) => a - b)

  const goTo = (changes: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString())
    Object.entries(changes).forEach(([name, value]) => params.set(name, value))
    router.push(`${pathname}?${params.toString()}`)
  }

    return (
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <span className="text-sm text-muted-foreground">
                Página {currentPage} de {lastPage}
            </span>
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Mostrar</span>
                    <Select
                        value={String(limit)}
                        // Al cambiar el tamaño se vuelve a la primera página.
                        onValueChange={(value) => goTo({ limit: value, page: "1" })}
                    >
                        <SelectTrigger size="sm" className="w-[4.5rem]" aria-label="Filas por página">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {pageSizes.map((size) => (
                                <SelectItem key={size} value={String(size)}>
                                    {size}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-x-2">
                    <Button
                        type="button"
                        size="sm"
                        aria-label="Página anterior"
                        disabled={currentPage <= 1}
                        onClick={() => goTo({ page: String(currentPage - 1) })}
                    >
                        <ArrowLeft className="text-white" />
                    </Button>

                    <Button
                        type="button"
                        size="sm"
                        aria-label="Página siguiente"
                        disabled={currentPage >= lastPage}
                        onClick={() => goTo({ page: String(currentPage + 1) })}
                    >
                        <ArrowRight className="text-white"/>
                    </Button>
                </div>
            </div>
        </div>
    )
}
