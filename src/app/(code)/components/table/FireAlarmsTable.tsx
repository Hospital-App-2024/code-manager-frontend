"use client";
import { fireAlarmColumns } from "@/components/table/columns";
import { DataTable } from "@/components/table/data-table";
import { Pagination } from "@/components/table/pagination";
import { getDevice } from "@/actions/fireAlarm/getDevice";
import { useEffect, useState } from "react";
import { IDevice, Meta } from "@/interfaces/fireAlarms.interface";

interface Props {
  limit: number;
  page: number;
  search?: string;
  nodo?: string;
}

export default function FireAlarmsTable({
  limit,
  page,
  nodo,
  search,
}: Props) {
  const [data, setData] = useState<IDevice[]>([]);
  const [meta, setMeta] = useState<Meta | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await getDevice({ limit, page, nodo, search });
        setData(response.data);
        setMeta(response.meta);
      } catch (error) {
        console.error("Error fetching fire alarms:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [limit, page, nodo, search]);

  return (
    <div>
      <DataTable
        columns={fireAlarmColumns}
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
