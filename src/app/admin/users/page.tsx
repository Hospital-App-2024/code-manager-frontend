import { Modal } from "@/app/(code)/components/modal/Modal";
import { UserForm } from "../components/form/UserForm";
import UserTable from "../components/table/UserTable";
import { Suspense } from "react";
import TableSkeleton from "@/components/skeleton/TableSkeleton";

interface Props {
  searchParams: Promise<{
    limit?: string;
    page?: string;
  }>;
}

export default async function UserPage(props: Props) {
  const searchParams = await props.searchParams;
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const limit = searchParams.limit ? parseInt(searchParams.limit) : 5;

  return (
    <div className="container mt-10 space-y-3">
      <div className="flex gap-2 mb-2">
        <Modal
          title="Crear Usuario"
          subtitle="Complete el formulario para crear un usuario"
        >
          <UserForm />
        </Modal>
      </div>
      <Suspense fallback={<TableSkeleton />}>
        <UserTable limit={limit} page={page} />
      </Suspense>
    </div>
  );
}
