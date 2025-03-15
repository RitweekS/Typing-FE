import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    addTypingTestInfo,
    getAllStats,
    getBestStats,
    getLeaderBoard,
} from "./api";
import { TypingTestBody } from "./type";

export const useAddTypingTestInfo = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: TypingTestBody) => addTypingTestInfo(data),
        onSettled: async (_, error) => {
            if (!error) {
                await queryClient.invalidateQueries({
                    queryKey: ["getBestStats"],
                });
                await queryClient.invalidateQueries({
                    queryKey: ["getAllStats"],
                });
            }
        },
    });
};
export const useGetBestStats = () => {
    return useQuery({
        queryKey: ["getBestStats"],
        queryFn: getBestStats,
    });
};
export const useGetAllStats = () => {
    return useQuery({
        queryKey: ["getAllStats"],
        queryFn: getAllStats,
    });
};
export const useGetLeaderboard = () => {
    return useQuery({
        queryKey: ["getLeaderBoard"],
        queryFn: getLeaderBoard,
    });
};
