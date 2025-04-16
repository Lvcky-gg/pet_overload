export type AnswerVotesState = {
    answerId: number;
    vote_status: number;
    isLiked: boolean;
    isDisliked: boolean;
};
export type RootState = {
    answerVotes: AnswerVotesState[];
    session: {
        user: {
            id: number;
            name: string;
            email: string;
            password: string;
            createdAt: string;
            updatedAt: string;
            deletedAt: string | null;
            profileImage: string;
        };
    };
    users: {
        allUsers: {
            id: number;
            name: string;
            email: string;
            password: string;
            createdAt: string;
            updatedAt: string;
            deletedAt: string | null;
            profileImage: string;
        }[];
    };

    allQuestions: {
        id: number;
        title: string;
        body: string;
        createdAt: string;
        updatedAt: string;
        deletedAt: string | null;
        userId: number;
    }[];
    allAnswers: {
        id: number;
        body: string;
        createdAt: string;
        updatedAt: string;
        deletedAt: string | null;
        questionId: number;
        userId: number;
    }[];
    allComments: {
        id: number;
        body: string;
        createdAt: string;
        updatedAt: string;
        deletedAt: string | null;
        answerId: number;
        userId: number;
    }[];
};
