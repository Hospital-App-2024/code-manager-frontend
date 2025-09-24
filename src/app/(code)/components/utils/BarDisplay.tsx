"use client";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Props {
  title: string;
  chartConfig: ChartConfig;
  data: Array<{ value: number; month: string }>;
  backgroundColor?: React.CSSProperties["backgroundColor"];
}

export const BarDisplay = ({ data, title, chartConfig, backgroundColor }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">{title}</CardTitle>
        <CardDescription className="text-center">
          Año: {new Date().getFullYear()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <BarChart accessibilityLayer data={data} margin={{ top: 20 }} >
            <CartesianGrid vertical={false}/>
            {/* <YAxis
              interval={0}
              allowDecimals={false}
              tickCount={10}
              tickMargin={4}
              width={20}
            /> */}
            <XAxis
              dataKey="month"
              tickLine={true}
              tickMargin={4}
              axisLine={true}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="value" radius={4} fill={backgroundColor || "var(--chart-1)"}>
              <LabelList dataKey="value" position="top" />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
