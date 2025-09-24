import { getCodeAirTotalByMonth } from "@/actions/codeAir/getCodeAirTotalByMonth";
import { BarDisplay } from "../utils/BarDisplay";

export default async function CodeAirTotalByMonth() {
  const codeAir = await getCodeAirTotalByMonth();

  return (
    <BarDisplay
      title="Total de Código Aéreo"
      data={codeAir}
      backgroundColor="#0891B2"
      chartConfig={{
        value: {
          label: "Total",
        },
      }}
    />
  );
}
