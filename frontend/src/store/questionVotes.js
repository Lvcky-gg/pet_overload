import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    questionVotes: {},
    loading: false,
};
export const questionVotesSlice = createSlice({
    name: 'questionVotes',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // actions
        //payload in the extraReducers is the value returned by the fulfilled or rejected promise in the async thunk function
        builder
            .addCase(getQuestionVotes.pending, (state) => {
                state.loading = true;
            })
            .addCase(getQuestionVotes.fulfilled, (state, action) => {
                state.loading = false;
                action.payload.forEach((vote) => {
                    state.questionVotes[vote.questionId] = vote;
                });
            })
            .addCase(getQuestionVotes.rejected, (state, action) => {
                console.log('Rejected with value:', action.payload);
                state.loading = false;
            })
            .addCase(deleteQustionVotes.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteQustionVotes.fulfilled, (state, action) => {
                state.loading = false;
                delete state.questionVotes[action.payload];
            })
            .addCase(deleteQustionVotes.rejected, (state, action) => {
                console.log('Rejected with value:', action.payload);
                state.loading = false;
            })
            .addCase(updateQuestionVotes.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateQuestionVotes.fulfilled, (state, action) => {
                state.loading = false;
                const updateVote = action.payload;
                state.questionVotes[updateVote.questionId] = updateVote;
            })
            .addCase(updateQuestionVotes.rejected, (state, action) => {
                console.log('Rejected with value:', action.payload);
                state.loading = false;
            });
    },
});
// thunks
export const getQuestionVotes = createAsyncThunk(
    'questionVotes/getQuestionVotes',
    async (_, { rejectWithValue }) => {
        const response = await fetch('/api/question_votes/current', {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            // payload for rejected
            const errData = await response.json();
            return rejectWithValue(errData);
        }
        // payload for fulfilled
        const data = await response.json();
        return data.questionVotes;
    }
);
export const deleteQustionVotes = createAsyncThunk(
    'questionVotes/deleteQuestionVotes',
    async (questionId, { rejectWithValue }) => {
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

        return questionId;
    }
);
export const updateQuestionVotes = createAsyncThunk(
    'questionVotes/updateQuestionVotes',
    async (questionId, isLiked, { rejectWithValue }) => {
        const response = await fetch(`/api/question_votes/${questionId}`, {
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
export default questionVotesSlice.reducer;
