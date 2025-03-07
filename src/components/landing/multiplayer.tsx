import React from "react";
import { Card } from "../ui/card";
import { Users } from "lucide-react";
import { Button } from "../ui/button";

const Multiplayer = () => {
    return (
        <div className="col-span-3 row-span-3 col-start-2 row-start-7 ">
            <Card className="h-full px-4">
                <div className="flex gap-2 items-center">
                    <Users size={16} strokeWidth={3} />
                    <p className="font-semibold text-base">Multiplayer Mode</p>
                </div>
                <div className="flex gap-2">
                    <Button className="flex-1">Create Room</Button>
                    <Button className="flex-1" variant="outline">
                        Join Room
                    </Button>
                </div>
            </Card>
        </div>
    );
};

export default Multiplayer;
