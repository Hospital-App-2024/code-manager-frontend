import { BarChart } from "../utils/BarChart";
import { getCodeGreenTotalByMonth } from "@/actions/codeGreen/getCodeGreenTotalByMonth";

export default async function CodeGreenTotalByMonth() {
  const codeGreen = await getCodeGreenTotalByMonth();

  return (
    <BarChart
      title="Total de Código Verde"
      data={{
        labels: codeGreen.map((item) => item.month),
        datasets: [
          {
            label: "Total",
            data: codeGreen.map((item) => item.value),
            borderWidth: 1,
            backgroundColor: "#4CAF50",
          },
        ],
      }}
    />
  );
}
