import { PdfRender } from "../components/utils/PdfRender";
import { SearchDate } from "../components/search/SearchDate";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import CodeGreenTable from "../components/table/CodeGreenTable";

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
    <div className="">
      <div className="flex gap-2 mb-2 justify-between flex-wrap">
        <div className="flex gap-2">
          <PdfRender
            url="/code-green/report"
            from={searchParams.from}
            to={searchParams.to}
          />
          <Link href="/code-green/create">
            <Button className="flex items-center gap-2">
              <PlusIcon className="w-4 h-4" />
              Activar código verde
            </Button>
          </Link>
        </div>
        <SearchDate />
      </div>
      <CodeGreenTable
        from={searchParams.from}
        to={searchParams.to}
        limit={limit}
        page={page}
      />
    </div>
  );
}
