"use client";
import { codeAirColumns } from "@/components/table/columns";
import { DataTable } from "@/components/table/data-table";
import { Pagination } from "@/components/table/pagination";
import { useCodeAir } from "@/hooks/use-code-air";

interface Props {
  limit: number;
  page: number;
}

export default function CodeAirTable({ limit, page }: Props) {
  const { data, isLoading, isFetching } = useCodeAir({ limit, page });

  return (
    <>
      <DataTable 
        columns={codeAirColumns} 
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
