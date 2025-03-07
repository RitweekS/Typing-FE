import React, { useCallback, useRef, useState } from "react";
import { Card } from "../ui/card";
import { Clock } from "lucide-react";
import { Button } from "../ui/button";
import { IoIosSpeedometer } from "react-icons/io";
import { FaRegClock, FaRegCheckCircle } from "react-icons/fa";
import { Input } from "../ui/input";

const Typing = () => {
    const [testTime, setTestTime] = useState(30);
    const inputRef = useRef(null);
    const [userInput, setUserInput] = useState("");
    const typingInfoList = [
        {
            label: "WPM",
            value: 0,
            icon: <IoIosSpeedometer color="#3B82F6" />,
        },
        {
            label: "Accuracy",
            value: 0,
            icon: <FaRegCheckCircle color="#10B981" />,
        },
        {
            label: "Seconds",
            value: 0,
            icon: <FaRegClock color="#F97316" />,
        },
    ];

    const testPara =
        "Lorem ipsum dolor sit amet consectetur adipisicing elit Fuga, temporibus ullam! Nihil rerum veritatis itaque, error quia impedit explicabo tempore.";

    // *TODO : Correct typed corrector to green
    // *TODO : If user typed wrong change the color to red
    // *TODO : Add underline to current typing character
    // *TODO : Restrict user to not type character more then the test paragraph
    // *TODO : Restrict user to not type any character if time is over
    // *TODO : Calculate the Accuracy,Speed and WPM
    // *TODO : Style the component

    const renderParagraph = useCallback(() => {
        if (userInput.length < testPara.length) {
            console.log(userInput);
        }

        return testPara.split("").map((c, index) => {
            let correct = false;
            let inCorrect = false;

            return (
                <span
                    key={index}
                    className={`${
                        index < userInput.length
                            ? c === userInput[index]
                                ? "text-green-500"
                                : "text-red-600 underline"
                            : ""
                    } ${
                        index === userInput.length - 1
                            ? "underline"
                            : "no-underline"
                    } text-base/7 font-semibold [word-spacing:5px]`}
                >
                    {c}
                </span>
            );
        });
    }, [userInput]);

    return (
        <div className="col-span-3 row-span-6">
            <Card className="h-full px-4">
                <div className="flex justify-between ">
                    <div className="flex gap-2 items-center">
                        <Clock size={16} strokeWidth={3} />
                        <p className="font-semibold text-base">Test Duration</p>
                    </div>
                    <div className="flex justify-between  gap-2">
                        <Button
                            variant={testTime === 30 ? "default" : "outline"}
                            className=""
                            onClick={() => setTestTime(30)}
                        >
                            30s
                        </Button>
                        <Button
                            variant={testTime === 60 ? "default" : "outline"}
                            className=""
                            onClick={() => setTestTime(60)}
                        >
                            1m
                        </Button>
                        <Button
                            variant={testTime === 120 ? "default" : "outline"}
                            className=""
                            onClick={() => setTestTime(120)}
                        >
                            2m
                        </Button>
                    </div>
                </div>
                <div className="h-full p-4 flex-1 bg-gray-100 dark:bg-gray-800 rounded-sm flex justify-between flex-col gap-2">
                    <div>{renderParagraph()}</div>
                    <Input
                        ref={inputRef}
                        value={userInput}
                        onChange={(e) => {
                            if (e.target.value.length >= testPara.length) {
                                setUserInput(e.target.value);
                            }
                        }}
                    />
                    {/* <p className="text-base">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Fuga, temporibus ullam! Nihil rerum veritatis itaque,
                        error quia impedit explicabo tempore.
                    </p> */}

                    {/* <Keyboard onChange={onChange} onKeyPress={onKeyPress} /> */}
                </div>
                <div className="flex gap-2">
                    {typingInfoList.map((v, index) => (
                        <div
                            key={index}
                            className="flex flex-col gap-1 rounded-sm p-4 flex-1 justify-center items-center  bg-gray-100 dark:bg-gray-800"
                        >
                            {v.icon}
                            <p>{v.value}</p>
                            <p>{v.label}</p>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
};

export default Typing;
