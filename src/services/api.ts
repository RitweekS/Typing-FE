import axios from "axios";
import { BestStats, Leaderboard, Stats, TypingTestBody } from "./type";

const AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    withCredentials: true,
});

export const addTypingTestInfo = async (data: TypingTestBody) => {
    return AxiosInstance.post("/typing-tests", data);
};
export const getBestStats = async () => {
    return AxiosInstance.get<BestStats>("/typing-tests/stats/user");
};
export const getAllStats = async () => {
    return AxiosInstance.get<Stats[]>("/typing-tests/stats/all");
};
export const getLeaderBoard = async () => {
    return AxiosInstance.get<Leaderboard[]>("/leaderboard");
};
