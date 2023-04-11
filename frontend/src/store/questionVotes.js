import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const questionVotesSlice = createSlice({
    name: 'questionVotes',
    initialState: {
        allQuestionVotes: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUsersQuestionVotes.fulfilled, (state, action) => {
                state.allQuestionVotes = action.payload;
            })
            .addCase(getUsersQuestionVotes.rejected, (state, action) => {
                console.log('Rejected with value:', action.payload);
            });
    },
});

export const getUsersQuestionVotes = createAsyncThunk(
    'questionVotes/getAllQuestionVotes',
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
