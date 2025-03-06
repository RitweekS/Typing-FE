import React from "react";
import { Card } from "../ui/card";
import Stats from "./stats";
import Progress from "./progress";
import Difficulty from "./difficulty";
import Leaderboard from "./Leaderboard";

const Landing = () => {
    return (
        <div className="h-full w-full flex flex-col">
            <div className="flex-1 pb-4 grid grid-cols-5 grid-rows-7 gap-4 ">
                <Stats />
                <div className="col-span-3 row-span-6">
                    <Card className="h-full px-4">6</Card>
                </div>
                <Difficulty />
                <Leaderboard />
                <Progress />
                <div className="col-span-3 row-span-3 col-start-2 row-start-7 ">
                    <Card className="h-full px-4">6</Card>
                </div>
            </div>
        </div>
    );
};

export default Landing;
