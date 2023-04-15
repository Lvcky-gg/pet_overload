import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
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
        // actions
        //payload in the extraReducers is the value returned by the fulfilled or rejected promise in the async thunk function
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

// thunks
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
            const errData = await response.json();
            return rejectWithValue(errData);
        }

        return data;
    }
);

export const deleteQuestionVoteById = createAsyncThunk(
    'questionVotes/deleteQuestionVoteById',
    async ({ questionVoteId }) => {
        const response = await fetch(`/api/question_votes/${questionVoteId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();
        console.log('Delete Question Vote Response:', data);

        if (!response.ok) {
            return false;
        }

        return questionVoteId;
    }
);

export const updateQuestionVoteById = createAsyncThunk(
    'questionVotes/updateQuestionVoteById',
    async ({ questionVoteId, isLiked }, { rejectWithValue }) => {
        isLiked = isLiked === 1 ? true : false;

        const response = await fetch(`/api/question_votes/${questionVoteId}`, {
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

export const createQuestionVote = createAsyncThunk(
    'questionVotes/createQuestionVote',
    async ({ questionId, isLiked }, { rejectWithValue }) => {
        isLiked = isLiked === 1 ? true : false;

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

// Selector that that returns the current vote status for a question
// Returns 1 if the user upvoted the question
// Returns 0 if the user hasn't voted on the question
// Returns -1 if the user downvoted the question
export const selectVoteStatus = (state, questionId) => {
    const questionVotes = state.questionVotes;
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
