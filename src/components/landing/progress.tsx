import React, { useMemo } from "react";
import { Card } from "../ui/card";
import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { useGetAllStats } from "@/services/queries";

// const chartData = [
//     { WAP: 186 },
//     { WAP: 305 },
//     { WAP: 237 },
//     { WAP: 73 },
//     { WAP: 209 },
//     { WAP: 214 },
// ];

const chartConfig = {
    WAP: {
        label: "WAP",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig;

const Progress = () => {
    const getAllStatsQuery = useGetAllStats();
    const chartData = useMemo(() => {
        if (getAllStatsQuery.data?.data) {
            return getAllStatsQuery.data.data.map((v) => ({ WAP: v.wpm }));
        }
        return [{ WAP: 0 }];
    }, [getAllStatsQuery.data]);
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
                                dataKey=" "
                                tickLine={false}
                                axisLine={false}
                                tickMargin={2}
                                // tickFormatter={(value) => value.slice(0, 3)}
                            />
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent hideLabel />}
                            />
                            <Line
                                dataKey="WAP"
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
