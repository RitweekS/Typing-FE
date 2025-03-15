import React from "react";
import { Card } from "../ui/card";
import { Gauge } from "lucide-react";
import { Button } from "../ui/button";
import { useGlobalStore } from "@/context/root-context";

type DifficultyType = "Easy" | "Medium" | "Hard";
const Difficulty = () => {
    const { difficulty, setDifficulty } = useGlobalStore();
    const DifficultyList: DifficultyType[] = ["Easy", "Medium", "Hard"];
    return (
        <div className="row-span-2 col-start-5 ">
            <Card className="h-full px-4">
                <div className="flex gap-2 items-center">
                    <Gauge size={16} strokeWidth={3} />
                    <p className="font-semibold text-base">Difficulty</p>
                </div>
                <div className="flex flex-col justify-between flex-1 gap-2">
                    {DifficultyList.map((d, index) => (
                        <Button
                            variant="outline"
                            key={index}
                            onClick={() => setDifficulty(d)}
                            className={`${
                                difficulty === d &&
                                " bg-gray-100 dark:bg-gray-800"
                            } border-0 shadow-none`}
                        >
                            {d}
                        </Button>
                    ))}
                </div>
            </Card>
        </div>
    );
};

export default Difficulty;
