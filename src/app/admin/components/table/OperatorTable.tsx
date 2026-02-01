"use client";
import { operatorColumns } from "@/components/table/columns";
import { DataTable } from "@/components/table/data-table";
import { Pagination } from "@/components/table/pagination";
import { getOperatorsWithPagination } from "@/actions/operator/getOperatorsWithPagination.ts";
import { useEffect, useState } from "react";
import { Operator, Meta } from "@/interfaces/operator.interface";

interface Props {
  limit: number;
  page: number;
}

export default function OperatorTable({ limit, page }: Props) {
  const [data, setData] = useState<Operator[]>([]);
  const [meta, setMeta] = useState<Meta | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await getOperatorsWithPagination({ limit, page });
        setData(response.data);
        setMeta(response.meta);
      } catch (error) {
        console.error("Error fetching operators:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [limit, page]);

  return (
    <div>
      <DataTable
        columns={operatorColumns}
        data={data}
        isLoading={isLoading}
      />
      {meta && (
        <Pagination
          currentPage={page}
          totalPages={meta.totalPages}
        />
      )}
    </div>
  );
}
