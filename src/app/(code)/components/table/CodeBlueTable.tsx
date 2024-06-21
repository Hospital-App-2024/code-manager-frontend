import { getCodeBlue } from "@/actions/codeBlue/getCodeBlue";
import { MainTable } from "@/components/table/MainTable";
import { Pagination } from "@/components/table/TablePagination";
import { TableCell, TableRow } from "@/components/ui/table";

const columns = [
  "Fecha/hora",
  "Equipo",
  "Ubicación",
  "Activo por",
  "Operador",
];

interface Props {
  limit: number;
  page: number;
}

export default async function CodeBlueTable({ limit, page }: Props) {
  const { data, meta } = await getCodeBlue({ limit, page });

  return (
    <div>
      <MainTable totalPages={meta.lastPage ?? 0} columns={columns}>
        {data.map((item, index) => (
          <TableRow key={index}>
            <TableCell>{`${item.createdAt}`}</TableCell>
            <TableCell>{item.team}</TableCell>
            <TableCell>{item.location}</TableCell>
            <TableCell>{item.activeBy}</TableCell>
            <TableCell>{item.operator}</TableCell>
          </TableRow>
        ))}
      </MainTable>
      <Pagination
        currentPage={meta.page}
        nextPage={meta.nextPage}
        prevPage={meta.prevPage}
        totalPages={meta.lastPage}
      />
    </div>
  );
}