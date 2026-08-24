import Link from "next/link";
import { ChevronLeftIcon } from "lucide-react";

import { EmergencyCodeForm } from "@/app/(code)/components/form/EmergencyCodeForm";
import { Button } from "@/components/ui/button";

export default function CreateCodeAirPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" className="pl-0 hover:bg-transparent" asChild>
          <Link href="/code-air">
            <ChevronLeftIcon className="w-4 h-4 mr-2" />
            Volver a la lista
          </Link>
        </Button>
        <h1 className="text-xl font-semibold tracking-tight text-muted-foreground">
          Crear Código Aéreo
        </h1>
      </div>
      <EmergencyCodeForm type="AIR" />
    </div>
  );
}
