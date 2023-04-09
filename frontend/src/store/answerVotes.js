import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    answerVotes: {},
    loading: false,
};
export const answerVotesSlice = createSlice({
    name: 'answerVotes',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAnswerVotes.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAnswerVotes.fulfilled, (state, action) => {
                state.loading = false;
                action.payload.forEach((vote) => {
                    state.answerVotes[vote.answerId] = vote;
                });
            })
            .addCase(getAnswerVotes.rejected, (state, action) => {
                console.log('Rejected with value:', action.payload);
                state.loading = false;
            })
            .addCase(deleteAnswerVotes.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteAnswerVotes.fulfilled, (state, action) => {
                state.loading = false;
                delete state.answerVotes[action.payload];
            })
            .addCase(deleteAnswerVotes.rejected, (state, action) => {
                console.log('Rejected with value:', action.payload);
                state.loading = false;
            })
            .addCase(updateAnswerVotes.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateAnswerVotes.fulfilled, (state, action) => {
                state.loading = false;
                const updateVote = action.payload;
                state.answerVotes[updateVote.answerId] = updateVote;
            })
            .addCase(updateAnswerVotes.rejected, (state, action) => {
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
    async (answerId, isLiked, { rejectWithValue }) => {
        const response = await fetch(`/api/answer_votes/${answerId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ isLiked }),
        });
        if (!response.ok) {
            const errData = await response.json();
            return rejectWithValue(errData);
        }
        const data = await response.json();
        return data;
    }
);

export default answerVotesSlice.reducer;
