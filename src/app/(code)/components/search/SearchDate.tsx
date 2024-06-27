"use client";

import * as React from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { IoSearch } from "react-icons/io5";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

export function SearchDate({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const route = useRouter();

  const { replace } = useRouter();

  const [date, setDate] = React.useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });

  const handleSelect = ({ from, to }: DateRange) => {
    if (!from || !to) {
      toast.error("Seleccione un rango de fechas");
      return;
    }

    const formatFrom = format(from, "yyyy-MM-dd");
    const formatTo = format(to, "yyyy-MM-dd");

    const params = new URLSearchParams(searchParams);
    params.set("from", formatFrom);
    params.set("to", formatTo);
    replace(`${pathName}?${params}`);
  };

  const reset = () => {
    setDate({ from: undefined, to: undefined });
    const params = new URLSearchParams(searchParams);
    params.delete("from");
    params.delete("to");
    replace(`${pathName}?${params.toString()}`);
  };

  return (
    <div className="flex gap-4">
      <div className={cn("grid gap-2", className)}>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={"outline"}
              className={cn(
                "w-[300px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <FaCalendarAlt className="mr-2 h-4 w-4" />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd, y")} -{" "}
                    {format(date.to, "LLL dd, y")}
                  </>
                ) : (
                  format(date.from, "LLL dd, y")
                )
              ) : (
                <span>Seleccionar rango de fechas</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex gap-2">
        <Button onClick={() => handleSelect(date!)} disabled={!date}>
          <IoSearch className="h-4 w-4" />
        </Button>
        <Button onClick={reset} variant="destructive">
          Limpiar
        </Button>
      </div>
    </div>
  );
}
