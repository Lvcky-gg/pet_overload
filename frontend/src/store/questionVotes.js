import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    questionVotes: [],
    loading: false,
};
export const questionVotesSlice = createSlice({
    name: 'questionVotes',
    initialState,
    reducers: {},
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
                state.questionVotes = state.questionVotes.fileter(
                    (vote) => vote.id === action.payload
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

        return data.question_votes;
    }
);

export const deleteQuestionVotes = createAsyncThunk(
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

        const data = await response.json();

        if (!response.ok) {
            return rejectWithValue(errData);
        }

        return data;
    }
);

export const { addNewQuestionVote } = questionVotesSlice.actions;

// Selector that that returns the current vote status for a question
// Returns 1 if the user upvoted the question
// Returns 0 if the user hasn't voted on the question
// Returns -1 if the user downvoted the question
export const selectVoteStatus = (state, questionId) => {
    const questionVotes = state.allQuestionVotes;
    const questionVote = questionVotes.find(
        (questionVote) => questionVote.question_id === questionId
    );

    if (!questionVote) {
        return 0;
    }

    return questionVote.vote_status;
};

export default questionVotesSlice.reducer;
