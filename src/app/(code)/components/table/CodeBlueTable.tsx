import { getCodeRed } from "@/actions/codeRed/getCodeRed";
import { MainTable } from "@/components/table/MainTable";
import { Pagination } from "@/components/table/TablePagination";
import { TableCell, TableRow } from "@/components/ui/table";

const columns = [
  "Fecha/Hora",
  "Hora llamada bomberos",
  "Comunicación con COGRID",
  "Ubicación",
  "Activo por",
  "Operador",
];

interface Props {
  limit: number;
  page: number;
}

export default async function CodeBlueTable({ limit, page }: Props) {
  const { data, meta } = await getCodeRed({ limit, page });

  return (
    <div>
      <MainTable totalPages={meta.totalPages} columns={columns}>
        {data.map((item, index) => (
          <TableRow key={index}>
            <TableCell>{`${item.createdAt}`}</TableCell>
            <TableCell>{`${item.firefighterCalledTime}`}</TableCell>
            <TableCell>{item.COGRID}</TableCell>
            <TableCell>{item.location}</TableCell>
            <TableCell>{item.activeBy}</TableCell>
            <TableCell>{item.operator}</TableCell>
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
