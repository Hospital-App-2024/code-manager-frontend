import { Suspense } from "react";
import { Modal } from "../components/modal/Modal";
import TableSkeleton from "@/components/skeleton/TableSkeleton";
import { CodeRedForm } from "../components/form/CodeRedForm";
import CodeRedTable from "../components/table/CodeRedTable";
import { PdfRender } from "../components/utils/PdfRender";

interface Props {
  searchParams: Promise<{
    limit?: string;
    page?: string;
  }>;
}

export default async function CodeRedPage(props: Props) {
  const searchParams = await props.searchParams;
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const limit = searchParams.limit ? parseInt(searchParams.limit) : 5;

  return (
    <div className="">
      <div className="flex gap-2 mb-2">
        <PdfRender url="/code-red/report" />
        <Modal
          title="Crear código rojo"
          subtitle="Complete el formulario para crear un código rojo"
        >
          <CodeRedForm />
        </Modal>
      </div>
      <CodeRedTable limit={limit} page={page} />
    </div>
  );
}
