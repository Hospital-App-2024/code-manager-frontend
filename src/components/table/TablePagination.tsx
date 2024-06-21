"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
interface Props {
  totalPages: number;
  nextPage: number | null;
  prevPage: number | null;
  currentPage: number;
}

export const Pagination = ({
  totalPages,
  nextPage,
  prevPage,
  currentPage,
}: Props) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const navigate = useRouter();

  const cratePageUrl = (page: number | string) => {
    const params = new URLSearchParams(searchParams);

    if (page === "...") {
      return `${pathname}?${params.toString()}`;
    }

    if (+page <= 0) {
      return `${pathname}`;
    }

    if (+page > totalPages) {
      return `${pathname}?${params.toString()}`;
    }

    params.set("page", page.toString());
    return `${pathname}?${params.toString()}`;
  };

  const handleNextPage = () => {
    if (nextPage === null) return;
    navigate.push(cratePageUrl(nextPage));
  };

  const handlePrevPage = () => {
    if (prevPage === null) return;
    navigate.push(cratePageUrl(prevPage));
  };

  const current = totalPages === 0 ? 0 : currentPage;

  return (
    <div className="bg-background flex items-center p-2 justify-between flex-wrap gap-2 flex-col md:flex-row">
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          Pagina {current} de {totalPages}
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <div className="inline-flex items-center gap-2 ">
          <p className="text-sm text-muted-foreground">Mostrar</p>
          <Select
            disabled={totalPages === 0}
            onValueChange={(value) => {
              const params = new URLSearchParams(searchParams);
              params.set("limit", value);
              navigate.push(`${pathname}?${params.toString()}`);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="5" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          disabled={prevPage === null}
          onClick={handlePrevPage}
          variant="default"
          size="sm"
        >
          <FaChevronLeft />
        </Button>
        <Button
          disabled={nextPage === null}
          onClick={handleNextPage}
          variant="default"
          size="sm"
        >
          <FaChevronRight />
        </Button>
      </div>
    </div>
  );
};
