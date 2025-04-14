import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface AnswerVote {
    id: number;
    answerId: number;
    isLiked: boolean;
}

const initialState: {
    answerVotes: AnswerVote[];
    loading: boolean;
} = {
    answerVotes: [],
    loading: false,
};
export const answerVotesSlice = createSlice({
    name: 'answerVotes',
    initialState,
    reducers: {
        clearAnswerVotes: (state) => {
            state.answerVotes = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAnswerVotes.fulfilled, (state, action) => {
                state.loading = false;
                state.answerVotes = action.payload;
            })
            .addCase(getAnswerVotes.rejected, (state, action) => {
                state.loading = false;
            })
            .addCase(deleteAnswerVotes.fulfilled, (state, action) => {
                state.loading = false;
                state.answerVotes = state.answerVotes.filter(
                    (vote) => vote.id === action.payload
                );
            })
            .addCase(deleteAnswerVotes.rejected, (state, action) => {
                state.loading = false;
            })
            .addCase(updateAnswerVotes.fulfilled, (state, action) => {
                state.loading = false;
                const updateVote = action.payload;
                const idx = state.answerVotes.findIndex(
                    (vote) => vote.answerId === updateVote.answerId
                );
                state.answerVotes[idx] = updateVote;
            })
            .addCase(updateAnswerVotes.rejected, (state, action) => {
                state.loading = false;
            })
            .addCase(createAnswerVote.fulfilled, (state, action) => {
                state.answerVotes.push(action.payload);
            })
            .addCase(createAnswerVote.rejected, (state, action) => {
                state.loading = false;
            })
            .addCase(deleteAnswerVoteById.fulfilled, (state, action) => {
                state.answerVotes = state.answerVotes.filter(
                    (vote) => vote.id !== action.payload
                );
            })
            .addCase(deleteAnswerVoteById.rejected, (state, action) => {
                state.loading = false;
            });
    },
});

export const getAnswerVotes = createAsyncThunk(
    'answerVotes/getAnswerVotes',
    async (_, { rejectWithValue }) => {
        const response = await fetch('/api/answer_votes/current', {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            const errData = await response.json();
            return rejectWithValue(errData);
        }
        const data = await response.json();
        return data.answerVotes;
    }
);

export const deleteAnswerVotes = createAsyncThunk<number, number>(
    'answerVotes/deleteAnswerVotes',
    async (answerId, { rejectWithValue }) => {
        const response = await fetch(`/api/answer_votes/${answerId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            const errData = await response.json();
            return rejectWithValue(errData);
        }
        return answerId;
    }
);

export const updateAnswerVotes = createAsyncThunk<
    AnswerVote,
    { answerVoteId: number; isLiked: boolean }
>(
    'answerVotes/updateAnswerVotes',
    async ({ answerVoteId, isLiked }, { rejectWithValue }) => {
        if (typeof isLiked !== 'boolean') {
            throw new Error('Invalid type for isLiked. Expected boolean.');
        }
        const response = await fetch(`/api/answer_votes/${answerVoteId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ isLiked }),
        });
        const data = await response.json();
        if (!response.ok) {
            return rejectWithValue(data);
        }

        return data;
    }
);
export const createAnswerVote = createAsyncThunk<
    AnswerVote,
    { answerId: number; isLiked: boolean }
>(
    'answerVotes/createAnswerVote',
    async ({ answerId, isLiked }, { rejectWithValue }) => {
        isLiked = Boolean(isLiked);

        const response = await fetch(`/api/answers/${answerId}/votes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ answerId, isLiked }),
        });
        const data = await response.json();
        if (!response.ok) {
            return rejectWithValue(data);
        }
        return data;
    }
);
export const deleteAnswerVoteById = createAsyncThunk<
    number,
    { answerVoteId: number }
>(
    'answerVotes/deleteAnswerVoteById',
    async ({ answerVoteId }, { rejectWithValue }) => {
        const response = await fetch(`/api/answer_votes/${answerVoteId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();

        if (!response.ok) {
            return rejectWithValue(data);
        }
        return answerVoteId;
    }
);
export const answerVoteStatus = (
    state: { answerVotes: AnswerVote[] },
    answerId: number
): AnswerVote | null => {
    const answerVotes = state.answerVotes;
    const answerVote = answerVotes.find(
        (answerVote: AnswerVote) => answerVote.answerId === answerId
    );

    if (!answerVote) {
        return null;
    }

    return answerVote;
};

export const { clearAnswerVotes } = answerVotesSlice.actions;

export default answerVotesSlice.reducer;
