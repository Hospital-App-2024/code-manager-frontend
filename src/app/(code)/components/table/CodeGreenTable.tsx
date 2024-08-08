import { getCodeGreen } from "@/actions/codeGreen/getCodeGreen";
import { MainTable } from "@/components/table/MainTable";
import { Pagination } from "@/components/table/TablePagination";
import { TableCell, TableRow } from "@/components/ui/table";
import { Modal } from "../modal/Modal";
import { HiOutlineLockClosed } from "react-icons/hi2";
import { CloseCodeGreenForm } from "../form/CloseCodeGreenForm";
import { MdOutlineModeEdit } from "react-icons/md";
import { CodeGreenForm } from "../form/CodeGreenForm";

const columns = [
  "Fecha",
  "Hora",
  "Activado por",
  "Carabineros",
  "Ubicación",
  "Evento",
  "Operador",
  "Acciones",
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
            <TableCell>{item.createdAt.split(",")[0]}</TableCell>
            <TableCell>{item.createdAt.split(",")[1]}</TableCell>
            <TableCell>{item.activeBy}</TableCell>
            <TableCell>{item.police}</TableCell>
            <TableCell>{item.location}</TableCell>
            <TableCell>{item.event}</TableCell>
            <TableCell>{item.operator}</TableCell>
            <TableCell>
              <Modal
                variant="ghost"
                title="Cerrar código verde"
                subtitle="Ingrese los datos para cerrar el código verde"
                icon={<HiOutlineLockClosed size={15} />}
                disabled={!!item.closedBy}
              >
                <CloseCodeGreenForm codeGreenId={item.id} />
              </Modal>
              <Modal
                variant="ghost"
                title="Editar código verde"
                subtitle="Ingrese los datos para editar el código verde"
                icon={<MdOutlineModeEdit size={15} />}
                disabled={!!item.closedBy}
              >
                <CodeGreenForm codeGreenId={item.id} />
              </Modal>
            </TableCell>
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
