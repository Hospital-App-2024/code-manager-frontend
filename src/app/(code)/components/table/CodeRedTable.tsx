"use client";
import { codeRedColumns } from "@/components/table/columns";
import { DataTable } from "@/components/table/data-table";
import { Pagination } from "@/components/table/pagination";
import { useCodeRed } from "@/hooks/use-code-red";

interface Props {
  limit: number;
  page: number;
}

export default function CodeRedTable({ limit, page }: Props) {
  const { data, isLoading, isFetching } = useCodeRed({ limit, page });

  return (
    <>
      <DataTable 
        columns={codeRedColumns} 
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
