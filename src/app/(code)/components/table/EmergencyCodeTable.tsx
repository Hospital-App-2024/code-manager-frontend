"use client";
import { DataTable } from "@/components/table/data-table";
import { Pagination } from "@/components/table/pagination";
import { useEmergencyCodes } from "@/hooks/use-emergency-codes";
import { CodeType } from "@/interfaces/emergencyCode.interface";
import { 
  codeGreenColumns, 
  codeBlueColumns, 
  codeRedColumns, 
  codeAirColumns, 
  codeLeakColumns 
} from "@/components/table/columns";
import { ColumnDef } from "@tanstack/react-table";

interface Props {
  type: CodeType;
  limit: number;
  page: number;
  from?: string;
  to?: string;
}

export default function EmergencyCodeTable({ type, limit, page, from, to }: Props) {
  const { data, isLoading, isFetching } = useEmergencyCodes({ limit, page, from, to, type });

  let columns: ColumnDef<any>[] = [];
  switch (type) {
    case "GREEN":
      columns = codeGreenColumns;
      break;
    case "BLUE":
      columns = codeBlueColumns;
      break;
    case "RED":
      columns = codeRedColumns;
      break;
    case "AIR":
      columns = codeAirColumns;
      break;
    case "LEAK":
      columns = codeLeakColumns;
      break;
  }

  return (
    <>
      <DataTable 
        columns={columns} 
        data={data?.data || []} 
        isLoading={isLoading || isFetching} 
      />
      <Pagination 
        currentPage={page} 
        totalPages={data?.meta?.lastPage || 1} 
      /> 
    </>
  );
}
