import React, { useCallback, useEffect, useRef, useState } from "react";
import { Card } from "../ui/card";
import { Clock } from "lucide-react";
import { Button } from "../ui/button";
import { IoIosSpeedometer } from "react-icons/io";
import { FaRegClock, FaRegCheckCircle } from "react-icons/fa";
import { easyLorem, hardLorem, mediumLorem } from "@/lib/generateText";
import { useGlobalStore } from "@/context/root-context";
import { useAddTypingTestInfo } from "@/services/queries";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

const Typing = () => {
    const [testTime, setTestTime] = useState(30);
    const inputRef = useRef<HTMLInputElement>(null);
    const [userInput, setUserInput] = useState("");
    const [wpm, setWpm] = useState(0);
    const [accuracy, setAccuracy] = useState(0);
    const [timeLeft, setTimeLeft] = useState(testTime);
    const [isRunning, setIsRunning] = useState(false);
    const [paragraph, setParagraph] = useState("");
    const store = useGlobalStore();

    const addTypingTestInfoMutation = useAddTypingTestInfo();
    useEffect(() => {
        if (isRunning && timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(timer);
        } else if (timeLeft === 0 && isRunning) {
            setIsRunning(false);
            calculateWPMAndAccuracy();
        }
    }, [isRunning, timeLeft]);

    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (!isRunning && e.code === "Space") {
                setIsRunning(true);
                setTimeLeft(testTime);
                inputRef.current?.focus();
                e.preventDefault();
            }
        };

        document.addEventListener("keydown", handleKeyPress);
        return () => document.removeEventListener("keydown", handleKeyPress);
    }, [isRunning, testTime]);

    useEffect(() => {
        if (store.difficulty === "Hard") {
            setParagraph(hardLorem.generateParagraphs(1));
        } else if (store.difficulty === "Medium") {
            setParagraph(mediumLorem.generateParagraphs(1));
        } else {
            setParagraph(easyLorem.generateParagraphs(2));
        }
    }, [store.difficulty]);

    const calculateWPMAndAccuracy = async () => {
        const correctChars = userInput
            .split("")
            .filter((char, index) => char === paragraph[index]).length;
        const totalChars = userInput.length;

        const wordsTyped = correctChars / 5;
        const minutes = testTime / 60;
        const currentAccuracy =
            totalChars > 0
                ? Math.round((correctChars / totalChars) * 100)
                : 100;
        const currentWPM = Math.round(wordsTyped / minutes) || 0;
        setWpm(currentWPM);
        setAccuracy(currentAccuracy);

        try {
            await addTypingTestInfoMutation.mutateAsync({
                accuracy: currentAccuracy,
                difficulty: store.difficulty.toLocaleLowerCase(),
                testDuration: testTime,
                wpm: currentWPM,
            });
        } catch (error) {
            if (error) {
                toast.error((error as AxiosError).message);
            }
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (timeLeft > 0 && e.target.value.length <= paragraph.length) {
            setUserInput(e.target.value);
        }
    };

    const resetTest = () => {
        setIsRunning(false);
        setUserInput("");
        setWpm(0);
        setAccuracy(100);
    };

    const renderParagraph = useCallback(() => {
        return paragraph.split("").map((c, index) => (
            <React.Fragment key={index}>
                <span
                    className={`${
                        index < userInput.length
                            ? c === userInput[index]
                                ? "text-green-400"
                                : "text-red-400 underline"
                            : "text-gray-400"
                    } ${
                        index === userInput.length && isRunning
                            ? "border-l-2 border-yellow-400 "
                            : ""
                    } text-2xl [word-spacing:4px] tracking-[2px] leading-[40px]`}
                >
                    {c}
                </span>
            </React.Fragment>
        ));
    }, [userInput, paragraph]);

    return (
        <div className="col-span-3 row-span-6">
            <Card className="h-full px-4">
                <div className="flex justify-between">
                    <div className="flex gap-2 items-center overflow-auto">
                        <Clock size={16} strokeWidth={3} />
                        <p className="font-semibold text-base">Test Duration</p>
                    </div>
                    <div className="flex gap-2">
                        {[30, 60, 120].map((time) => (
                            <Button
                                key={time}
                                variant={
                                    testTime === time ? "default" : "outline"
                                }
                                onClick={() => {
                                    setTestTime(time);
                                    setTimeLeft(time);
                                    resetTest();
                                }}
                            >
                                {time}s
                            </Button>
                        ))}
                    </div>
                </div>
                <div
                    id="paragraph"
                    className="p-4 flex-1 bg-gray-100 dark:bg-gray-800 rounded-sm flex flex-col gap-2 h-full overflow-auto"
                >
                    <p
                        className={`text-gray-500 text-sm ${
                            isRunning ? "invisible" : "visible"
                        }`}
                    >
                        Press <span className="font-bold">Space</span> to start
                        typing...
                    </p>
                    <div className="relative flex-1 overflow-auto p-2">
                        <div className=" overflow-y-auto p-2">
                            {renderParagraph()}
                        </div>
                    </div>
                    <input
                        ref={inputRef}
                        value={userInput}
                        onChange={handleInputChange}
                        disabled={timeLeft === 0}
                        className="absolute opacity-0"
                    />
                </div>
                <div className="flex  gap-2">
                    {[
                        {
                            label: "WPM",
                            value: wpm,
                            icon: <IoIosSpeedometer color="#3B82F6" />,
                        },
                        {
                            label: "Accuracy",
                            value: accuracy + "%",
                            icon: <FaRegCheckCircle color="#10B981" />,
                        },
                        {
                            label: "Seconds",
                            value: timeLeft,
                            icon: <FaRegClock color="#F97316" />,
                        },
                    ].map((v, index) => (
                        <div
                            key={index}
                            className="flex flex-col gap-1 p-4 flex-1 justify-center items-center bg-gray-100 dark:bg-gray-800 rounded-sm"
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
