import axios from "axios";
import { BestStats, Stats, TypingTestBody } from "./type";

const AxiosInstance = axios.create({
    baseURL: "http://localhost:8000",
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
