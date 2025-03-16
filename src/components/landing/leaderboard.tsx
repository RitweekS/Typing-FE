import React, { useMemo } from "react";
import { Card } from "../ui/card";
import { ChartSpline } from "lucide-react";
import Image from "next/image";
import { useGetLeaderboard } from "@/services/queries";

const Leaderboard = () => {
    const getLeaderboardQuery = useGetLeaderboard();
    const leaderboardList = useMemo(() => {
        if (
            getLeaderboardQuery.data &&
            getLeaderboardQuery.data.data.length > 0
        ) {
            return [
                {
                    name: getLeaderboardQuery.data.data[0].user.name,
                    value: getLeaderboardQuery.data.data[0].score,
                    icon: "/first.svg",
                },
                {
                    name: getLeaderboardQuery.data.data[1].user.name,
                    value: getLeaderboardQuery.data.data[1].score,
                    icon: "/second.svg",
                },
                {
                    name: getLeaderboardQuery.data.data[2].user.name,
                    value: getLeaderboardQuery.data.data[2].score,
                    icon: "/third.svg",
                },
            ];
        }
        return [];
    }, [getLeaderboardQuery.data]);
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
