import { Modal } from "@/app/(code)/components/modal/Modal";
import { Suspense } from "react";
import TableSkeleton from "@/components/skeleton/TableSkeleton";
import OperatorTable from "../components/table/OperatorTable";
import { OperatorForm } from "../components/form/OperatorForm";

interface Props {
  searchParams: {
    limit?: string;
    page?: string;
  };
}

export default function OperatorPage({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const limit = searchParams.limit ? parseInt(searchParams.limit) : 5;

  return (
    <div className="container mt-10 space-y-3">
      <div className="flex gap-2 mb-2">
        <Modal
          title="Crear Operador"
          subtitle="Complete el formulario para crear un operador"
        >
          <OperatorForm />
        </Modal>
      </div>
      <Suspense fallback={<TableSkeleton />}>
        <OperatorTable limit={limit} page={page} />
      </Suspense>
    </div>
  );
}
