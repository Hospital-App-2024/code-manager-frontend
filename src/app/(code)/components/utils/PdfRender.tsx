"use client";

import { useEffect, useState } from "react";
import { FaRegFilePdf } from "react-icons/fa6";
import { Download, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { emergency_codes } from "@/requests";
import { CodeType } from "@/interfaces/emergencyCode.interface";

interface Props {
  type: CodeType;
  from?: string;
  to?: string;
}

const REPORT_NAMES: Record<CodeType, string> = {
  GREEN: "verde",
  BLUE: "azul",
  AIR: "aereo",
  RED: "rojo",
  LEAK: "fuga",
};

export function PdfRender({ type, from, to }: Props) {
  const [open, setOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [error, setError] = useState(false);

  // Al abrir el diálogo se pide el PDF con el token del usuario y se muestra desde
  // un blob; al cerrarlo se libera.
  useEffect(() => {
    if (!open) return;

    let cancelled = false;
    let objectUrl: string | null = null;
    setPdfUrl(null);
    setError(false);

    emergency_codes
      .report(type, { from, to })
      .then((blob) => {
        if (cancelled) return;
        objectUrl = URL.createObjectURL(blob);
        setPdfUrl(objectUrl);
      })
      .catch((err) => {
        console.error("Error al generar el reporte:", err);
        if (!cancelled) setError(true);
      });

    return () => {
      cancelled = true;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [open, type, from, to]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon" aria-label="Ver reporte en PDF">
          <FaRegFilePdf size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-5xl">
        <DialogHeader>
          <DialogTitle>Reporte de código</DialogTitle>
          <DialogDescription>
            Revise el reporte o descárguelo en formato PDF
          </DialogDescription>
        </DialogHeader>

        <div className="h-[65vh] w-full overflow-hidden rounded-md border bg-muted/30">
          {pdfUrl ? (
            <iframe
              src={pdfUrl}
              title="Reporte en PDF"
              className="h-full w-full"
            />
          ) : (
            <div className="flex h-full items-center justify-center gap-2 px-4 text-center text-sm text-muted-foreground">
              {error ? (
                "No se pudo generar el reporte. Cierre esta ventana e intente nuevamente."
              ) : (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Generando reporte...
                </>
              )}
            </div>
          )}
        </div>

        <DialogFooter className="gap-2 sm:justify-start">
          {pdfUrl && (
            <Button asChild>
              <a href={pdfUrl} download={`reporte-codigo-${REPORT_NAMES[type]}.pdf`}>
                <Download className="h-4 w-4" />
                Descargar
              </a>
            </Button>
          )}
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cerrar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
