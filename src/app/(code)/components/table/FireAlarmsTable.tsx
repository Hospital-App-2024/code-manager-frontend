import { getDevice } from "@/actions/fireAlarm/getDevice";
import { MainTable } from "@/components/table/MainTable";
import { Pagination } from "@/components/table/TablePagination";
import { TableCell, TableRow } from "@/components/ui/table";

const columns = [
  "Dispositivo",
  "Nodo - Edificio",
  "Lazo",
  "ID de dispositivo",
  "Ubicación",
  "Operativo",
  "Observaciones",
];

interface Props {
  limit: number;
  page: number;
  search?: string;
  nodo?: string;
}

export default async function FireAlarmsTable({
  limit,
  page,
  nodo,
  search,
}: Props) {
  const { data, meta } = await getDevice({ limit, page, nodo, search });

  return (
    <div>
      <MainTable totalPages={meta.totalPages} columns={columns}>
        {data.map((item, index) => (
          <TableRow key={index}>
            <TableCell>{item.typeDevice}</TableCell>
            <TableCell>{item.nodo}</TableCell>
            <TableCell>{item.lazo}</TableCell>
            <TableCell>{item.device}</TableCell>
            <TableCell>{item.location}</TableCell>
            <TableCell>{item.operative}</TableCell>
            <TableCell>{item.observations}</TableCell>
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
