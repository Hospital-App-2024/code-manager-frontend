import Link from "next/link";
import { ChevronLeftIcon } from "lucide-react";
import { EmergencyCodeForm } from "@/app/(code)/components/form/EmergencyCodeForm";
import { Button } from "@/components/ui/button";

export default function CreatePage() {
  return (
    <>
      <div className="mb-8">
        <Button variant="ghost" className="pl-0 hover:bg-transparent" asChild>
          <Link href="/code-blue">
            <ChevronLeftIcon className="w-4 h-4 mr-2" />
            Volver a la lista
          </Link>
        </Button>
      </div>
      <EmergencyCodeForm type="BLUE" />
    </>
  );
}
