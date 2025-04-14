import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface QuestionVote {
    id: number;
    questionId: number;
    isLiked: boolean;
}

const initialState: {
    questionVotes: QuestionVote[];
    loading: boolean;
} = {
    questionVotes: [],
    loading: false,
};

export const questionVotesSlice = createSlice({
    name: 'questionVotes',
    initialState,
    reducers: {
        clearQuestionVotes: (state) => {
            state.questionVotes = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getQuestionVotes.fulfilled, (state, action) => {
                state.loading = false;
                state.questionVotes = action.payload;
            })
            .addCase(getQuestionVotes.rejected, (state, action) => {
                state.loading = false;
            })
            .addCase(deleteQuestionVotes.fulfilled, (state, action) => {
                state.loading = false;
                state.questionVotes = state.questionVotes.filter(
                    (vote) => vote.id !== action.payload
                );
            })
            .addCase(deleteQuestionVotes.rejected, (state, action) => {
                state.loading = false;
            })
            .addCase(updateQuestionVotes.fulfilled, (state, action) => {
                state.loading = false;
                const updateVote = action.payload;
                const idx = state.questionVotes.findIndex(
                    (vote) => vote.questionId === updateVote.questionId
                );
                state.questionVotes[idx] = updateVote;
            })
            .addCase(updateQuestionVotes.rejected, (state, action) => {
                state.loading = false;
            })
            .addCase(deleteQuestionVoteById.fulfilled, (state, action) => {
                state.questionVotes = state.questionVotes.filter(
                    (vote) => vote.id !== action.payload
                );
            })
            .addCase(createQuestionVote.fulfilled, (state, action) => {
                state.questionVotes.push(action.payload);
            })
            .addCase(updateQuestionVoteById.fulfilled, (state, action) => {
                const updatedVote = action.payload;
                const idx = state.questionVotes.findIndex(
                    (vote) => vote.id === updatedVote.id
                );

                state.questionVotes[idx] = updatedVote;
            });
    },
});

export const getQuestionVotes = createAsyncThunk(
    'questionVotes/getQuestionVotes',
    async (_, { rejectWithValue }) => {
        const response = await fetch('/api/question_votes/current', {
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        if (!response.ok) {
            rejectWithValue(await response.json());
        }

        const data = await response.json();

        return data.questionVotes;
    }
);

export const deleteQuestionVotes = createAsyncThunk(
    'questionVotes/deleteQuestionVotes',
    async (questionId: number, { rejectWithValue }) => {
        const response = await fetch(`/api/question_votes/${questionId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errData = await response.json();

            return rejectWithValue(errData);
        }

        return Number(questionId);
    }
);

interface UpdateQuestionVotesPayload {
    questionId: number;
    isLiked: boolean;
}

interface UpdateQuestionVotesResponse {
    id: number;
    questionId: number;
    isLiked: boolean;
}

export const updateQuestionVotes = createAsyncThunk<
    UpdateQuestionVotesResponse,
    UpdateQuestionVotesPayload,
    { rejectValue: any }
>(
    'questionVotes/updateQuestionVotes',
    async (
        { questionId, isLiked }: { questionId: number; isLiked: boolean },
        { rejectWithValue }
    ) => {
        const response = await fetch(`/api/question_votes/${questionId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ isLiked }),
        });

        const data: UpdateQuestionVotesResponse = await response.json();

        if (!response.ok) {
            const errData = await response.json();
            return rejectWithValue(errData);
        }

        return data;
    }
);

export const deleteQuestionVoteById = createAsyncThunk<
    number, // Return type
    { questionVoteId: number }, // Parameter type
    { rejectValue: any } // Rejection type
>(
    'questionVotes/deleteQuestionVoteById',
    async (
        { questionVoteId }: { questionVoteId: number },
        { rejectWithValue }
    ) => {
        const response = await fetch(`/api/question_votes/${questionVoteId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();

        if (!response.ok) {
            return rejectWithValue(data);
        }

        return questionVoteId;
    }
);

export const updateQuestionVoteById = createAsyncThunk<
    QuestionVote, // Return type
    { questionVoteId: number; isLiked: boolean }, // Parameter type
    { rejectValue: any } // Rejection type
>(
    'questionVotes/updateQuestionVoteById',
    async (
        {
            questionVoteId,
            isLiked,
        }: { questionVoteId: number; isLiked: boolean },
        { rejectWithValue }
    ) => {
        const response = await fetch(`/api/question_votes/${questionVoteId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ isLiked }),
        });

        const data: QuestionVote = await response.json();

        if (!response.ok) {
            return rejectWithValue(data);
        }

        return data;
    }
);

interface CreateQuestionVotePayload {
    questionId: number;
    isLiked: boolean;
}

export const createQuestionVote = createAsyncThunk<
    QuestionVote, // Return type
    CreateQuestionVotePayload, // Parameter type
    { rejectValue: any } // Rejection type
>(
    'questionVotes/createQuestionVote',
    async (
        { questionId, isLiked }: CreateQuestionVotePayload,
        { rejectWithValue }
    ) => {
        const response = await fetch(`/api/questions/${questionId}/votes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ questionId, isLiked }),
        });

        const data = await response.json();

        if (!response.ok) {
            return rejectWithValue(data);
        }

        return data;
    }
);

interface RootState {
    questionVotes: {
        questionVotes: QuestionVote[];
        loading: boolean;
    };
}

export const selectVoteStatus = (
    state: RootState,
    questionId: number
): QuestionVote | null => {
    const questionVotes = state.questionVotes.questionVotes;
    const questionVote = questionVotes.find(
        (questionVote) => questionVote.questionId === questionId
    );

    if (!questionVote) {
        return null;
    }

    return questionVote;
};

// export const { addNewQuestionVote } = questionVotesSlice.actions;

export const { clearQuestionVotes } = questionVotesSlice.actions;

export default questionVotesSlice.reducer;
