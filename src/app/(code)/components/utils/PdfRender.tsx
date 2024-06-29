import { Button } from "@/components/ui/button";
import { FaRegFilePdf } from "react-icons/fa6";
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

interface Props {
  url: string;
  from?: string;
  to?: string;
}

export function PdfRender({ url, from, to }: Props) {
  const params = new URLSearchParams();
  if (from) params.append("from", from);
  if (to) params.append("to", to);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon">
          <FaRegFilePdf size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full">
        <DialogHeader>
          <DialogTitle>Reporte de código</DialogTitle>
          <DialogDescription>
            Descargue el reporte en formato PDF
          </DialogDescription>
        </DialogHeader>
        <iframe
          src={`${process.env.URL_BACKEND}${url}?${params}`}
          style={{ width: "100%", height: "400px" }}
          allowFullScreen
        ></iframe>
        <DialogFooter className="sm:justify-start">
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
