import { BarChart } from "../utils/BarChart";
import { getCodeAirTotalByMonth } from "@/actions/codeAir/getCodeAirTotalByMonth";

export default async function CodeAirTotalByMonth() {
  const codeAir = await getCodeAirTotalByMonth();

  return (
    <BarChart
      title="Total de Código Aéreo"
      data={{
        labels: codeAir.map((item) => item.month),
        datasets: [
          {
            label: "Total",
            data: codeAir.map((item) => item.value),
            borderWidth: 1,
            backgroundColor: "#0891B2",
          },
        ],
      }}
    />
  );
}
