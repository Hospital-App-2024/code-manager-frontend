import { ResponseCodeGreen } from "@/interfaces/codeGreen.interface";
import { columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(
  limit: number,
  page: number
): Promise<ResponseCodeGreen> {
  const res = await fetch(
    `${process.env.URL_BACKEND}/code-green?page=${page}&limit=${limit}`,
    {
      cache: "no-cache",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  return data;
}

interface Props {
  searchParams: {
    page?: string;
    take?: string;
  };
}

export default async function CodeGreenPage({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const take = searchParams.take ? parseInt(searchParams.take) : 5;

  const data = await getData(take, page);

  return (
    <div className="container mt-10">
      <DataTable columns={columns} data={data.data} meta={data.meta} pagination={{ page, take }} />
    </div>
  );
}
