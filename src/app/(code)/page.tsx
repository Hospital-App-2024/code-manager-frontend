import { Suspense } from "react";
import EmergencyCodeTotalByMonth from "./components/chart/EmergencyCodeTotalByMonth";
import BarSkeleton from "@/components/skeleton/BarSkeleton";

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 container py-4 gap-4">
      <Suspense fallback={<BarSkeleton />}>
        <EmergencyCodeTotalByMonth type="BLUE" title="Código Azul" color="#3b82f6" />
      </Suspense>

      <Suspense fallback={<BarSkeleton />}>
        <EmergencyCodeTotalByMonth type="AIR" title="Código Aéreo" color="#eab308" />
      </Suspense>

      <Suspense fallback={<BarSkeleton />}>
        <EmergencyCodeTotalByMonth type="GREEN" title="Código Verde" color="#22c55e" />
      </Suspense>

      <Suspense fallback={<BarSkeleton />}>
        <EmergencyCodeTotalByMonth type="RED" title="Código Rojo" color="#ef4444" />
      </Suspense>

      <Suspense fallback={<BarSkeleton />}>
        <EmergencyCodeTotalByMonth type="LEAK" title="Código Fuga" color="#a855f7" />
      </Suspense>
    </div>
  );
}
