"use client";
import { userColumns } from "@/components/table/columns";
import { DataTable } from "@/components/table/data-table";
import { Pagination } from "@/components/table/pagination";
import { getUsers } from "@/actions/user/getUsers";
import { useEffect, useState } from "react";
import { User, Meta } from "@/interfaces/user.interface";

interface Props {
  limit: number;
  page: number;
}

export default function UserTable({ limit, page }: Props) {
  const [data, setData] = useState<User[]>([]);
  const [meta, setMeta] = useState<Meta | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await getUsers({ limit, page });
        setData(response.data);
        setMeta(response.meta);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [limit, page]);

  return (
    <div>
      <DataTable
        columns={userColumns}
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
