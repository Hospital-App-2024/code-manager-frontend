import { getCodeAir } from "@/actions/codeAir/getCodeAir";
import { getCodeBlue } from "@/actions/codeBlue/getCodeBlue";
import { getCodeLeak } from "@/actions/codeLeak/getCodeLeak";
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

export default async function CodeLeakTable({ limit, page }: Props) {
  const { data, meta } = await getCodeLeak({ limit, page });

  return (
    <div>
      <MainTable totalPages={meta.totalPages} columns={columns}>
        {data.map((item, index) => (
          <TableRow key={index}>
            <TableCell>{`${item.createdAt}`}</TableCell>
            <TableCell>{item.location}</TableCell>
            <TableCell>{item.activeBy}</TableCell>
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
