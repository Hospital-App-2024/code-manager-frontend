import { getUsers } from "@/actions/user/getUsers";
import { MainTable } from "@/components/table/MainTable";
import { Pagination } from "@/components/table/TablePagination";
import { TableCell, TableRow } from "@/components/ui/table";
import { UserStatusToggle } from "../form/UserStatusToggle";

const columns = ["Fecha/Hora", "name", "email", "role", "Activo"];

interface Props {
  limit: number;
  page: number;
}

export default async function UserTable({ limit, page }: Props) {
  const { data, meta } = await getUsers({ limit, page });

  return (
    <div>
      <MainTable totalPages={meta.totalPages} columns={columns}>
        {data.map((item, index) => (
          <TableRow key={index}>
            <TableCell>{`${item.createdAt}`}</TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.email}</TableCell>
            <TableCell>{item.role}</TableCell>
            <TableCell>
              <UserStatusToggle value={item.isActive} userId={item.id} />
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
