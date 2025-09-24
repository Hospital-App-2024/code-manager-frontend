import { getCodeGreenTotalByMonth } from "@/actions/codeGreen/getCodeGreenTotalByMonth";
import { BarDisplay } from "@/app/(code)/components/utils/BarDisplay";

export default async function CodeGreenTotalByMonth() {
  const codeGreen = await getCodeGreenTotalByMonth();

  return (
    <BarDisplay
      title="Total de Código Verde"
      data={codeGreen}
      backgroundColor="#4CAF50"
      chartConfig={{
        value: {
          label: "Total",
        },
      }}
    />
  );
}
