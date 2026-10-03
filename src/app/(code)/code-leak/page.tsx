import Link from "next/link";
import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PdfRender } from "../components/utils/PdfRender";
import { SearchDate } from "../components/search/SearchDate";
import EmergencyCodeTable from "../components/table/EmergencyCodeTable";

interface Props {
  searchParams: Promise<{
    limit?: string;
    page?: string;
    from?: string;
    to?: string;
  }>;
}

export default async function CodeLeakPage(props: Props) {
  const searchParams = await props.searchParams;
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const limit = searchParams.limit ? parseInt(searchParams.limit) : 5;

  return (
    <div>
      <div className="flex gap-2 mb-4 justify-between flex-wrap items-center">
        <div className="flex gap-2">
          <PdfRender
            type="LEAK"
            from={searchParams.from}
            to={searchParams.to}
          />
          <Link href="/code-leak/create">
            <Button className="flex items-center gap-2">
              <PlusIcon className="w-4 h-4" />
              Crear código de fuga
            </Button>
          </Link>
        </div>
        <SearchDate />
      </div>
      <EmergencyCodeTable
        type="LEAK"
        from={searchParams.from}
        to={searchParams.to}
        limit={limit}
        page={page}
      />
    </div>
  );
}
