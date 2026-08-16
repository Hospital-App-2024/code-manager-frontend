const fs = require('fs');
const path = require('path');

const tablesDir = 'src/app/(code)/components/table';
if (fs.existsSync(tablesDir)) {
  fs.readdirSync(tablesDir).forEach(file => {
    if ((file.startsWith('Code') || file.startsWith('Fire')) && file !== 'EmergencyCodeTable.tsx') {
      fs.unlinkSync(path.join(tablesDir, file));
    }
  });
}

const codes = [
  { dir: 'code-blue', type: 'BLUE', label: 'azul' },
  { dir: 'code-red', type: 'RED', label: 'rojo' },
  { dir: 'code-air', type: 'AIR', label: 'aéreo' },
  { dir: 'code-leak', type: 'LEAK', label: 'de fuga' }
];

codes.forEach(c => {
  const pagePath = `src/app/(code)/${c.dir}/page.tsx`;
  if (fs.existsSync(pagePath)) {
    const content = `import { PdfRender } from "../components/utils/PdfRender";
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
            url="/emergency-codes/report?type=${c.type}"
            from={searchParams.from}
            to={searchParams.to}
          />
          <Link href="/${c.dir}/create">
            <Button className="flex items-center gap-2">
              <PlusIcon className="w-4 h-4" />
              Activar código ${c.label}
            </Button>
          </Link>
        </div>
        <SearchDate />
      </div>
      <EmergencyCodeTable
        type="${c.type}"
        from={searchParams.from}
        to={searchParams.to}
        limit={limit}
        page={page}
      />
    </div>
  );
}
`;
    fs.writeFileSync(pagePath, content);
  }
});
