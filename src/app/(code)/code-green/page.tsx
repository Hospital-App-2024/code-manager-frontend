import { Suspense } from "react";
import { CodeGreenForm } from "../components/form/CodeGreenForm";
import { Modal } from "../components/modal/Modal";
import CodeGreenTable from "../components/table/CodeGreenTable";
import TableSkeleton from "@/components/skeleton/TableSkeleton";
import { PdfRender } from "../components/utils/PdfRender";
import { SearchDate } from "../components/search/SearchDate";

interface Props {
  searchParams: Promise<{
    limit?: string;
    page?: string;
    from?: string;
    to?: string;
  }>;
}

export default async function CodeGreenPage(props: Props) {
  const searchParams = await props.searchParams;
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const limit = searchParams.limit ? parseInt(searchParams.limit) : 5;

  return (
    <div className="container mt-10 space-y-3">
      <div className="flex gap-2 mb-2 justify-between flex-wrap">
        <div className="flex gap-2">
          <PdfRender
            url="/code-green/report"
            from={searchParams.from}
            to={searchParams.to}
          />
          <Modal
            title="Crear Código Verde"
            subtitle="Complete el formulario para crear un código verde"
          >
            <CodeGreenForm />
          </Modal>
        </div>
        <SearchDate />
      </div>
      <Suspense fallback={<TableSkeleton />}>
        <CodeGreenTable
          from={searchParams.from}
          to={searchParams.to}
          limit={limit}
          page={page}
        />
      </Suspense>
    </div>
  );
}
