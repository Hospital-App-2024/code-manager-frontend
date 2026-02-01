import Link from "next/link";
import { ChevronLeftIcon } from "lucide-react";
import { CodeGreenCreateForm } from "@/app/(code)/components/form/CodeGreenCreateForm";
import { Button } from "@/components/ui/button";

export default function CreateCodeGreenPage() {
  return (
    <>
      <div className="mb-8">
        <Button variant="ghost" className="pl-0 hover:bg-transparent" asChild>
          <Link href="/code-green">
            <ChevronLeftIcon className="w-4 h-4 mr-2" />
            Volver a la lista
          </Link>
        </Button>
      </div>

      <CodeGreenCreateForm />
    </>
  );
}
