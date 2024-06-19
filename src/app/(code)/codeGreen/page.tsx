import CodeGreenPdfDownloader from "../components/download/CodeGreenPdfDownloader";
import { CodeGreenTable } from "../components/table/CodeGreenTable";

export default function CodeGreenPage() {
  return (
    <div className="container mt-10 space-y-3">
      <CodeGreenPdfDownloader />
      <CodeGreenTable />
    </div>
  );
}
