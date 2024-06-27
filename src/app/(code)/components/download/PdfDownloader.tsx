"use client";
import { FaRegFilePdf } from "react-icons/fa6";
import { Button } from "@/components/ui/button";

// async function getData() {
//   const response = await fetch(`${process.env.URL_BACKEND}/code-green/report`);
//   const data = await response.blob();
//   return data;
// }

interface Props {
  url: string;
}

export default function PdfDownloader({ url }: Props) {
  const downloadPdf = async () => {
    const resp = await fetch(`${process.env.NEXT_PUBLIC_URL_BACKEND}${url}`);
    const data = await resp.blob();
    const downloadUrl = window.URL.createObjectURL(data);
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = "archivo.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(downloadUrl);
  };

  return (
    <Button size="icon" onClick={downloadPdf}>
      <FaRegFilePdf />
    </Button>
  );
}
