export interface TypingTestBody {
    wpm: number;
    accuracy: number;
    testDuration: number;
    difficulty: string;
}

export interface BestStats {
    bestWAP: number;
    averageWAP: number;
    totalTestTaken: number;
}
export interface Stats {
    id: string;
    userId: string;
    wpm: number;
    accuracy: number;
    testDuration: number;
    difficulty: string;
    createdAt: Date;
}
export interface Leaderboard {
    user: {
        name: string;
        email: string;
        avatarUrl: string;
    };
    score: number;
}
