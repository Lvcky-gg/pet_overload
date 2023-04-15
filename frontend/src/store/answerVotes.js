import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
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
                console.log('Rejected with value:', action.payload);
                state.loading = false;
            })
            .addCase(deleteAnswerVotes.fulfilled, (state, action) => {
                state.loading = false;
                state.answerVotes = state.answerVotes.filter(
                    (vote) => vote.id === action.payload
                );
            })
            .addCase(deleteAnswerVotes.rejected, (state, action) => {
                console.log('Rejected with value:', action.payload);
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
                console.log('Rejected with value:', action.payload);
                state.loading = false;
            })
            .addCase(createAnswerVote.fulfilled, (state, action) => {
                state.answerVotes.push(action.payload);
            })
            .addCase(createAnswerVote.rejected, (state, action) => {
                console.log('Rejected with value:', action.payload);
                state.loading = false;
            })
            .addCase(deleteAnswerVoteById.fulfilled, (state, action) => {
                state.answerVotes = state.answerVotes.filter(
                    (vote) => vote.id !== action.payload
                );
            })
            .addCase(deleteAnswerVoteById.rejected, (state, action) => {
                console.log('Rejected with value:', action.payload);
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

export const deleteAnswerVotes = createAsyncThunk(
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

export const updateAnswerVotes = createAsyncThunk(
    'answerVotes/updateAnswerVotes',
    async ({ answerVoteId, isLiked }, { rejectWithValue }) => {
        isLiked = isLiked === 1 ? true : false;
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
export const createAnswerVote = createAsyncThunk(
    'answerVotes/createAnswerVote',
    async ({ answerId, isLiked }, { rejectWithValue }) => {
        isLiked = isLiked === 1 ? true : false;

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
export const deleteAnswerVoteById = createAsyncThunk(
    'answerVotes/deleteAnswerVoteById',
    async ({ answerVoteId }) => {
        const response = await fetch(`/api/answer_votes/${answerVoteId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        console.log('Delete Answer Vote Response:', data);

        if (!response.ok) {
            return false;
        }
        return answerVoteId;
    }
);
export const answerVoteStatus = (state, answerId) => {
    const answerVotes = state.answerVotes;
    const answerVote = answerVotes.find(
        (answerVote) => answerVote.answerId === answerId
    );

    if (!answerVote) {
        return null;
    }

    return answerVote;
};

export const { clearAnswerVotes } = answerVotesSlice.actions;

export default answerVotesSlice.reducer;
