"use client";
import { codeLeakColumns } from "@/components/table/columns";
import { DataTable } from "@/components/table/data-table";
import { Pagination } from "@/components/table/pagination";
import { useCodeLeak } from "@/hooks/use-code-leak";

interface Props {
  limit: number;
  page: number;
}

export default function CodeLeakTable({ limit, page }: Props) {
  const { data, isLoading, isFetching } = useCodeLeak({ limit, page });

  return (
    <>
      <DataTable 
        columns={codeLeakColumns} 
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
