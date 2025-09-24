import { Suspense } from "react";
import { Modal } from "../components/modal/Modal";
import TableSkeleton from "@/components/skeleton/TableSkeleton";
import { CodeAirForm } from "../components/form/CodeAirForm";
import CodeAirTable from "../components/table/CodeAirTable";
import { PdfRender } from "../components/utils/PdfRender";

interface Props {
  searchParams: Promise<{
    limit?: string;
    page?: string;
  }>;
}

export default async function CodeAirPage(props: Props) {
  const searchParams = await props.searchParams;
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const limit = searchParams.limit ? parseInt(searchParams.limit) : 5;

  return (
    <div className="container mt-10 space-y-3">
      <div className="flex gap-2 mb-2">
        <PdfRender url="/code-air/report" />
        <Modal
          title="Crear código Aéreo"
          subtitle="Complete el formulario para crear un código aéreo"
        >
          <CodeAirForm />
        </Modal>
      </div>
      <Suspense fallback={<TableSkeleton />}>
        <CodeAirTable limit={limit} page={page} />
      </Suspense>
    </div>
  );
}
