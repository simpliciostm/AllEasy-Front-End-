import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import type { IBarChartProps } from "@/models/interfaces/IBarChart"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"

const BarCharComponent = (props: IBarChartProps) => {
    const chartConfig = {
        desktop: {
            label: "Desktop",
            color: "var(--chart-2)",
        },
        mobile: {
            label: "Mobile",
            color: "var(--chart-2)",
        },
        label: {
            color: "var(--background)",
        },
    } satisfies ChartConfig

    return (
        <Card className="w-full h-72">
            <CardHeader>
                <CardTitle className="text-white">{props.title}</CardTitle>
                <CardDescription className="text-white">{props.description}</CardDescription>
            </CardHeader>
            <CardContent className="w-full h-44">
                <ChartContainer className="h-full w-full" config={chartConfig}>
                    <BarChart
                        accessibilityLayer
                        data={props.list}
                        layout="vertical"
                        margin={{
                            right: 10,
                        }}
                    >
                        <CartesianGrid horizontal={false} />
                        <YAxis
                            dataKey={props.listKeyName}
                            type="category"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                            hide
                        />
                        <XAxis dataKey={props.keyBarName} type="number" hide />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent />}
                        />
                        <Bar
                            dataKey={props.keyBarName}
                            layout="vertical"
                            fill="var(--color-chart-1)"
                            radius={4}
                        >
                            <LabelList
                                dataKey={props.listKeyName}
                                position="insideLeft"
                                offset={8}
                                fontSize={12}
                                fill="white"
                            />
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}

export default BarCharComponent
