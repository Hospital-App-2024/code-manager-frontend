const fs = require('fs');

const codes = [
  { dir: 'code-blue', type: 'BLUE' },
  { dir: 'code-red', type: 'RED' },
  { dir: 'code-air', type: 'AIR' },
  { dir: 'code-leak', type: 'LEAK' },
  { dir: 'code-green', type: 'GREEN' }
];

codes.forEach(c => {
  const createPath = `src/app/(code)/${c.dir}/create/page.tsx`;
  if (fs.existsSync(createPath)) {
    const content = `import Link from "next/link";
import { ChevronLeftIcon } from "lucide-react";
import { EmergencyCodeForm } from "@/app/(code)/components/form/EmergencyCodeForm";
import { Button } from "@/components/ui/button";

export default function CreatePage() {
  return (
    <>
      <div className="mb-8">
        <Button variant="ghost" className="pl-0 hover:bg-transparent" asChild>
          <Link href="/${c.dir}">
            <ChevronLeftIcon className="w-4 h-4 mr-2" />
            Volver a la lista
          </Link>
        </Button>
      </div>
      <EmergencyCodeForm type="${c.type}" />
    </>
  );
}
`;
    fs.writeFileSync(createPath, content);
  }
});
