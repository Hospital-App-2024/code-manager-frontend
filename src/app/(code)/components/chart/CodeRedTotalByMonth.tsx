import { getCodeRedTotalByMonth } from "@/actions/codeRed/getCodeRedTotalByMonth";
import { BarDisplay } from "../utils/BarDisplay";

export default async function CodeRedTotalByMonth() {
  const codeRed = await getCodeRedTotalByMonth();

  return (
    <BarDisplay
      title="Total de Código Rojo"
      data={codeRed}
      backgroundColor="#F44336"
      chartConfig={{
        value: {
          label: "Total",
        },
      }}
    />
  );
}
