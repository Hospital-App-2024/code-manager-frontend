import { getEmergencyCodeTotalByMonth } from "@/actions/emergencyCodes/getEmergencyCodeTotalByMonth";
import { BarDisplay } from "@/app/(code)/components/utils/BarDisplay";
import { CodeType } from "@/interfaces/emergencyCode.interface";
import { ChartConfig } from "@/components/ui/chart";

interface Props {
  type: CodeType;
  title: string;
  color: string;
}

export default async function EmergencyCodeTotalByMonth({ type, title, color }: Props) {
  const data = await getEmergencyCodeTotalByMonth(type);
  
  const chartConfig = {
    value: {
      label: title,
      color: color,
    },
  } satisfies ChartConfig;

  return (
    <BarDisplay
      data={data}
      title={title}
      chartConfig={chartConfig}
      backgroundColor={color}
    />
  );
}
