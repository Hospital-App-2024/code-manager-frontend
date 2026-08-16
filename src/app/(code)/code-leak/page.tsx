import { PdfRender } from "../components/utils/PdfRender";
import { SearchDate } from "../components/search/SearchDate";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import EmergencyCodeTable from "../components/table/EmergencyCodeTable";

interface Props {
  searchParams: Promise<{
    limit?: string;
    page?: string;
    from?: string;
    to?: string;
  }>;
}

export default async function Page(props: Props) {
  const searchParams = await props.searchParams;
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const limit = searchParams.limit ? parseInt(searchParams.limit) : 5;

  return (
    <div className="">
      <div className="flex gap-2 mb-2 justify-between flex-wrap">
        <div className="flex gap-2">
          <PdfRender
            url="/emergency-codes/report?type=LEAK"
            from={searchParams.from}
            to={searchParams.to}
          />
          <Link href="/code-leak/create">
            <Button className="flex items-center gap-2">
              <PlusIcon className="w-4 h-4" />
              Activar código de fuga
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
