import { BarChart } from "../utils/BarChart";
import { getCodeRedTotalByMonth } from "@/actions/codeRed/getCodeRedTotalByMonth";

export default async function CodeRedTotalByMonth() {
  const codeRed = await getCodeRedTotalByMonth();

  return (
    <BarChart
      title="Total de Código Rojo"
      data={{
        labels: codeRed.map((item) => item.month),
        datasets: [
          {
            label: "Total",
            data: codeRed.map((item) => item.value),
            borderWidth: 1,
            backgroundColor: "#F44336",
          },
        ],
      }}
    />
  );
}
