import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PdfRender } from "../components/utils/PdfRender";
import CodeLeakTable from "../components/table/CodeLeakTable";

interface Props {
  searchParams: Promise<{
    limit?: string;
    page?: string;
  }>;
}

export default async function CodeLeakPage(props: Props) {
  const searchParams = await props.searchParams;
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const limit = searchParams.limit ? parseInt(searchParams.limit) : 5;

  return (
    <div className="">
      <div className="flex gap-2 mb-2">
        <PdfRender url="/code-leak/report" />
        <Link href="/code-leak/create">
          <Button className="flex items-center gap-2">
            <PlusIcon className="w-4 h-4" />
            Activar código de fuga
          </Button>
        </Link>
      </div>
      <CodeLeakTable limit={limit} page={page} />
    </div>
  );
}
