"use client"
import { DataTable } from "@/components/table/data-table";
import { columns } from '../../codeGreen/columns';
import { useCodeGreen } from "@/hooks/useCodeGreen";
import { useState } from "react";
import { PaginationState } from "@tanstack/react-table";
import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";


export const CodeGreenTable = () => {

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });

  const [date, setDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });

  const { data, isLoading } = useCodeGreen(pagination);

  return (
    <DataTable 
      columns={columns}
      data={data?.rows ?? []}
      isLoading={isLoading}
      pagination={pagination}
      onPaginationChange={setPagination}
      totalRows={data?.rowCount ?? 0}
    />
  )
}
