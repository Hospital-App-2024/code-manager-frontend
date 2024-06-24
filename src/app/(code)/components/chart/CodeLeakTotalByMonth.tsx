import { getCodeLeakTotalByMonth } from "@/actions/codeLeak/getCodeLeakTotalByMonth";
import { BarChart } from "../utils/BarChart";

export default async function CodeLeakTotalByMonth() {
  const codeLeak = await getCodeLeakTotalByMonth();

  return (
    <BarChart
      title="Total de Código de Fuga"
      data={{
        labels: codeLeak.map((item) => item.month),
        datasets: [
          {
            label: "Total",
            data: codeLeak.map((item) => item.value),
            borderWidth: 1,
            backgroundColor: "#FFC107",
          },
        ],
      }}
    />
  );
}
