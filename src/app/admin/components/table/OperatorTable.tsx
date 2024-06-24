import { MainTable } from "@/components/table/MainTable";
import { Pagination } from "@/components/table/TablePagination";
import { TableCell, TableRow } from "@/components/ui/table";
import { getOperatorsWithPagination } from "@/actions/operator/getOperatorsWithPagination.ts";

const columns = ["ID", "Nombre"];

interface Props {
  limit: number;
  page: number;
}

export default async function OperatorTable({ limit, page }: Props) {
  const { data, meta } = await getOperatorsWithPagination({ limit, page });

  return (
    <div>
      <MainTable totalPages={meta.totalPages} columns={columns}>
        {data.map((item, index) => (
          <TableRow key={index}>
            <TableCell>{item.id}</TableCell>
            <TableCell>{item.name}</TableCell>
          </TableRow>
        ))}
      </MainTable>
      <Pagination
        currentPage={meta.currentPage}
        nextPage={meta.nextPage}
        prevPage={meta.prevPage}
        totalPages={meta.totalPages}
      />
    </div>
  );
}
