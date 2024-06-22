import { Suspense } from "react";
import { Modal } from "../components/modal/Modal";
import TableSkeleton from "@/components/skeleton/TableSkeleton";
import PdfDownloader from "../components/download/PdfDownloader";
import CodeBlueTable from "../components/table/CodeBlueTable";
import { CodeRedForm } from "../components/form/CodeRedForm";

interface Props {
  searchParams: {
    limit?: string;
    page?: string;
  };
}

export default function CodeRedPage({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const limit = searchParams.limit ? parseInt(searchParams.limit) : 5;

  return (
    <div className="container mt-10 space-y-3">
      <div className="flex gap-2 mb-2">
        <PdfDownloader url="/code-red/report" />
        <Modal
          title="Crear código rojo"
          subtitle="Complete el formulario para crear un código rojo"
        >
          <CodeRedForm />
        </Modal>
      </div>
      <Suspense fallback={<TableSkeleton />}>
        <CodeBlueTable limit={limit} page={page} />
      </Suspense>
    </div>
  );
}
