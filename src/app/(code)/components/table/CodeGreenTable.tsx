"use client";
import { codeGreenColumns } from "@/components/table/columns";
import { DataTable } from "@/components/table/data-table";
import { Pagination } from "@/components/table/pagination";
import { useCodeGreen } from "@/hooks/use-code-green";

interface Props {
  limit: number;
  page: number;
  from?: string;
  to?: string;
}

export default function CodeGreenTable({ limit, page, from, to }: Props) {
  const { data, isLoading, isFetching } = useCodeGreen({ limit, page, from, to });

  return (
    <>
      <DataTable 
        columns={codeGreenColumns} 
        data={data?.data || []} 
        isLoading={isLoading || isFetching} 
      />
      <Pagination 
        currentPage={page} 
        totalPages={data?.meta.totalPages || 1} 
      /> 
    </>
  );
}
