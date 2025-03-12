import React, { useMemo } from "react";
import { Card } from "../ui/card";
import { ChartNoAxesColumn } from "lucide-react";
import { useGetBestStats } from "@/services/queries";

const Stats = () => {
    const getBestStatsQuery = useGetBestStats();
    const list = useMemo(() => {
        return [
            {
                label: "Best WPM",
                value: getBestStatsQuery.data?.data.bestWAP ?? 0,
            },
            {
                label: "Average WPM",
                value: getBestStatsQuery.data?.data.averageWAP ?? 0,
            },
            {
                label: "Tests Taken",
                value: getBestStatsQuery.data?.data.totalTestTaken ?? 0,
            },
        ];
    }, [getBestStatsQuery.data]);
    return (
        <div className="row-span-2">
            <Card className="h-full px-4">
                <div className="flex gap-2 items-center">
                    <ChartNoAxesColumn size={18} strokeWidth={3} />
                    <p className="font-semibold text-base">Your Stats</p>
                </div>
                <div className="flex flex-col justify-between flex-1">
                    {list.map((v, index) => (
                        <div className="flex justify-between" key={index}>
                            <p className="text-sm">{v.label}</p>
                            <p className="text-sm font-bold">{v.value}</p>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
};

export default Stats;
