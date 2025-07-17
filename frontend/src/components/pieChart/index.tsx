import { Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import type { IPieChartProps } from "@/models/interfaces/IPieChart"

const chartConfig = {
  Pessoal: {
    label: "Pessoal",
    color: "var(--chart-1)",
  },
  Other: {
    label: "Other",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig

const PieChartComponent = (props: IPieChartProps) => {
  return (
    <Card className="w-full min-w-52 max-w-1/5 flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-white">{props.title}</CardTitle>
        <CardDescription className="text-white">{props.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie data={props.list} dataKey={props.keyBarName} nameKey={props.listKeyName} />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default PieChartComponent
