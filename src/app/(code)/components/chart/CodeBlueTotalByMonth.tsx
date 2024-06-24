import { getCodeBlueTotalByMonth } from "@/actions/codeBlue/getCodeBlueTotalByMonth";
import { BarChart } from "../utils/BarChart";

export default async function CodeBlueTotalByMonth() {
  const codeBlue = await getCodeBlueTotalByMonth();

  return (
    <BarChart
      title="Total de Código Azul"
      data={{
        labels: codeBlue.map((item) => item.month),
        datasets: [
          {
            label: "Total",
            data: codeBlue.map((item) => item.value),
            borderWidth: 1,
            backgroundColor: "#3182CE",
          },
        ],
      }}
    />
  );
}
