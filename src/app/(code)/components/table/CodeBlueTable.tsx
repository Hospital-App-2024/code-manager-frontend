"use client";
import { getCodeBlue } from "@/actions/codeBlue/getCodeBlue";
import { codeBlueColumns } from "@/components/table/columns";
import { DataTable } from "@/components/table/data-table";
import { MainTable } from "@/components/table/MainTable";
import { Pagination } from "@/components/table/pagination";
import { TableCell, TableRow } from "@/components/ui/table";
import { useCodeBlue } from "@/hooks/use-code-blue";

interface Props {
  limit: number;
  page: number;
}

export default function CodeBlueTable({ limit, page }: Props) {
  const { data, isLoading, isFetching } = useCodeBlue({ limit, page });

  return (
    <>
    <DataTable columns={codeBlueColumns} data={data?.data || []} isLoading={isLoading || isFetching} />
    <Pagination currentPage={page} totalPages={data?.meta.totalPages || 1} /> 
    </>
  );
}
