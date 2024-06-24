import { Suspense } from "react";
import CodeBlueTotalByMonth from "./components/chart/CodeBlueTotalByMonth";
import BarSkeleton from "@/components/skeleton/BarSkeleton";
import CodeAirTotalByMonth from "./components/chart/CodeAirTotalByMonth";
import CodeGreenTotalByMonth from "./components/chart/CodeGreenTotalByMonth";
import CodeRedTotalByMonth from "./components/chart/CodeRedTotalByMonth";
import CodeLeakTotalByMonth from "./components/chart/CodeLeakTotalByMonth";

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 container py-4 gap-2">
      <Suspense fallback={<BarSkeleton />}>
        <CodeBlueTotalByMonth />
      </Suspense>

      <Suspense fallback={<BarSkeleton />}>
        <CodeAirTotalByMonth />
      </Suspense>

      <Suspense fallback={<BarSkeleton />}>
        <CodeGreenTotalByMonth />
      </Suspense>

      <Suspense fallback={<BarSkeleton />}>
        <CodeRedTotalByMonth />
      </Suspense>

      <Suspense fallback={<BarSkeleton />}>
        <CodeLeakTotalByMonth />
      </Suspense>
    </div>
  );
}
