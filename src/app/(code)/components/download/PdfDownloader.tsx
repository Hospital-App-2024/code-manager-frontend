import { FaRegFilePdf } from "react-icons/fa6";
import { Button } from "@/components/ui/button";

interface Props {
  url: string;
}

export default function PdfDownloader({ url }: Props) {
  return (
    <Button size="icon" asChild>
        <a href={`${process.env.URL_BACKEND}${url}`} target="_blank">
            <FaRegFilePdf size={20} />
        </a>
    </Button>
  );
}