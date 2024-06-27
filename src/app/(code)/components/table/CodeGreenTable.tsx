import { getCodeGreen } from "@/actions/codeGreen/getCodeGreen";
import { MainTable } from "@/components/table/MainTable";
import { Pagination } from "@/components/table/TablePagination";
import { TableCell, TableRow } from "@/components/ui/table";

const columns = [
  "Fecha/hora",
  "Operador",
  "Activo por",
  "Carabineros",
  "Ubicación",
  "Evento",
];

interface Props {
  limit: number;
  page: number;
  from?: string;
  to?: string;
}

export default async function CodeGreenTable({ limit, page, from, to }: Props) {
  const { data, meta } = await getCodeGreen({ limit, page, from, to });

  return (
    <div>
      <MainTable totalPages={meta.totalPages} columns={columns}>
        {data.map((item, index) => (
          <TableRow key={index}>
            <TableCell>{`${item.createdAt}`}</TableCell>
            <TableCell>{item.operator}</TableCell>
            <TableCell>{item.activeBy}</TableCell>
            <TableCell>{item.police}</TableCell>
            <TableCell>{item.location}</TableCell>
            <TableCell>{item.event}</TableCell>
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
