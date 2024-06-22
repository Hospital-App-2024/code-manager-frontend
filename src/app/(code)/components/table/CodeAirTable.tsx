import { getCodeAir } from "@/actions/codeAir/getCodeAir";
import { getCodeBlue } from "@/actions/codeBlue/getCodeBlue";
import { MainTable } from "@/components/table/MainTable";
import { Pagination } from "@/components/table/TablePagination";
import { TableCell, TableRow } from "@/components/ui/table";

const columns = [
  "Fecha/Hora",
  "Lugar de la emergencia",
  "Detalle de la emergencia",
  "Activo por",
  "Operador",
];

interface Props {
  limit: number;
  page: number;
}

export default async function CodeAirTable({ limit, page }: Props) {
  const { data, meta } = await getCodeAir({ limit, page });

  return (
    <div>
      <MainTable totalPages={meta.totalPages} columns={columns}>
        {data.map((item, index) => (
          <TableRow key={index}>
            <TableCell>{`${item.createdAt}`}</TableCell>
            <TableCell>{item.location}</TableCell>
            <TableCell>{item.emergencyDetail}</TableCell>
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
