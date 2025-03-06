import React from "react";
import { Card } from "../ui/card";
import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
    { month: "January", desktop: 186 },
    { month: "February", desktop: 305 },
    { month: "March", desktop: 237 },
    { month: "April", desktop: 73 },
    { month: "May", desktop: 209 },
    { month: "June", desktop: 214 },
];

const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig;

const Progress = () => {
    return (
        <div className="row-span-3 col-start-1 row-start-3 ">
            <Card className="h-full px-4">
                <div className="flex gap-2 items-center">
                    <TrendingUp size={16} strokeWidth={3} />
                    <p className="font-semibold text-base">Progress</p>
                </div>
                <div className="flex-1 bg-accent">
                    <ChartContainer
                        config={chartConfig}
                        className="h-full w-full"
                    >
                        <LineChart
                            accessibilityLayer
                            data={chartData}
                            margin={{
                                left: 12,
                                right: 12,
                            }}
                        >
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                tickFormatter={(value) => value.slice(0, 3)}
                            />
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent hideLabel />}
                            />
                            <Line
                                dataKey="desktop"
                                type="linear"
                                strokeWidth={2}
                                dot={true}
                            />
                        </LineChart>
                    </ChartContainer>
                </div>
            </Card>
        </div>
    );
};

export default Progress;
