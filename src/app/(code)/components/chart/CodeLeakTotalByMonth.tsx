import { getCodeLeakTotalByMonth } from "@/actions/codeLeak/getCodeLeakTotalByMonth";
import { BarDisplay } from "@/app/(code)/components/utils/BarDisplay";

export default async function CodeLeakTotalByMonth() {
  const codeLeak = await getCodeLeakTotalByMonth();

  return (
    <BarDisplay
      title="Total de Código de Fuga"
      data={codeLeak}
      backgroundColor="#FFC107"
      chartConfig={{
        value: {
          label: "Total",
        },
      }}
    />
  );
}
