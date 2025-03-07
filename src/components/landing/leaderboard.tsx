import React, { useMemo } from "react";
import { Card } from "../ui/card";
import { ChartSpline } from "lucide-react";
import Image from "next/image";

const Leaderboard = () => {
    const leaderboardList = useMemo(() => {
        return [
            {
                name: "Alex M.",
                value: "85",
                icon: "/first.svg",
            },
            {
                name: "Sarah K.",
                value: "73",
                icon: "/second.svg",
            },
            {
                name: "John D.",
                value: "124",
                icon: "/third.svg",
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
                        <div
                            className="flex justify-between bg-gray-100 p-2 rounded-sm
 dark:bg-gray-800"
                            key={index}
                        >
                            <div className="flex gap-2">
                                <Image
                                    width={12}
                                    height={12}
                                    alt="position"
                                    src={v.icon}
                                />
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
