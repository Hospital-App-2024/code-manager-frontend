import { FaRegFilePdf } from "react-icons/fa6";
import { Button } from "@/components/ui/button";

export default function CodeGreenPdfDownloader() {
  return (
    <Button size="icon" asChild>
        <a href={`${process.env.URL_BACKEND}/code-green/report`} target="_blank">
            <FaRegFilePdf size={20} />
        </a>
    </Button>
  );
}