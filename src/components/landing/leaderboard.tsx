import React, { useMemo } from "react";
import { Card } from "../ui/card";
import { ChartSpline } from "lucide-react";

const Leaderboard = () => {
    const leaderboardList = useMemo(() => {
        return [
            {
                name: "Best WPM",
                value: "85",
                icon: "",
            },
            {
                name: "Average WPM",
                value: "73",
                icon: "",
            },
            {
                name: "Tests Taken",
                value: "124",
                icon: "",
            },
        ];
    }, []);
    return (
        <div className="row-span-2 col-start-5 row-start-3 ">
            <Card className="h-full px-4">
                <div className="flex gap-2 items-center">
                    <ChartSpline size={16} strokeWidth={3} />
                    <p className="font-semibold text-base">Leaderboard</p>
                </div>
                <div className="flex flex-col justify-between flex-1">
                    {leaderboardList.map((v, index) => (
                        <div className="flex justify-between" key={index}>
                            <div>
                                <p className="text-sm">{v.name}</p>
                            </div>
                            <p className="text-sm font-bold">{v.value}</p>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
};

export default Leaderboard;
