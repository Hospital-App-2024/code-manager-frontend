import { Suspense } from "react";
import TableSkeleton from "@/components/skeleton/TableSkeleton";
import CodeBlueTable from "../components/table/CodeBlueTable";
import { PdfRender } from "../components/utils/PdfRender";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

interface Props {
  searchParams: Promise<{
    limit?: string;
    page?: string;
  }>;
}

export default async function CodeBluePage(props: Props) {
  const searchParams = await props.searchParams;
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const limit = searchParams.limit ? parseInt(searchParams.limit) : 5;

  return (
    <div className="">
      <div className="flex gap-2 mb-2">
        <PdfRender url="/code-blue/report" />
        <Link href="/code-blue/create">
          <Button className="flex items-center gap-2">
            <PlusIcon className="w-4 h-4" />
            Crear código azul
          </Button>
        </Link>
      </div>
      <CodeBlueTable limit={limit} page={page} />
    </div>
  );
}
