import { Suspense } from "react";
import { Modal } from "../components/modal/Modal";
import TableSkeleton from "@/components/skeleton/TableSkeleton";
import PdfDownloader from "../components/download/PdfDownloader";
import { CodeAirForm } from "../components/form/CodeAirForm";
import CodeAirTable from "../components/table/CodeAirTable";
import { CodeLeakForm } from "../components/form/CodeLeakForm";
import CodeLeakTable from "../components/table/CodeLeakTable";

interface Props {
  searchParams: {
    limit?: string;
    page?: string;
  };
}

export default function CodeLeakPage({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const limit = searchParams.limit ? parseInt(searchParams.limit) : 5;

  return (
    <div className="container mt-10 space-y-3">
      <div className="flex gap-2 mb-2">
        <PdfDownloader url="/code-blue/report" />
        <Modal
          title="Crear código de fuga"
          subtitle="Complete el formulario para crear un código de fuga"
        >
          <CodeLeakForm />
        </Modal>
      </div>
      <Suspense fallback={<TableSkeleton />}>
        <CodeLeakTable limit={limit} page={page} />
      </Suspense>
    </div>
  );
}
