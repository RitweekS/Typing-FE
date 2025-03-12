import React from "react";
import Stats from "./stats";
import Progress from "./progress";
import Difficulty from "./difficulty";
import Leaderboard from "./leaderboard";
import Multiplayer from "./multiplayer";
import Typing from "./typing";

const Landing = () => {
    return (
        <div className="h-full w-full flex flex-col">
            <div className="flex-1 pb-4 grid grid-cols-5 grid-rows-7 gap-4 overflow-auto">
                <Stats />
                <Typing />
                <Difficulty />
                <Leaderboard />
                <Progress />
                <Multiplayer />
            </div>
        </div>
    );
};

export default Landing;
