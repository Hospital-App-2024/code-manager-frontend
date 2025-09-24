import { getCodeBlueTotalByMonth } from "@/actions/codeBlue/getCodeBlueTotalByMonth";
import { BarDisplay } from "@/app/(code)/components/utils/BarDisplay";

export default async function CodeBlueTotalByMonth() {
  const codeBlue = await getCodeBlueTotalByMonth();

  return (
      <BarDisplay
        title="Total de Código Azul"
        data={codeBlue}
        backgroundColor="#3182CE"
        chartConfig={{
          value: {
            label: "Total",
          },
        }}
      />
  );
}
