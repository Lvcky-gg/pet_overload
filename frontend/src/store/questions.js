import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const questionsSlice = createSlice({
    name: 'questions',
    initialState: {
        allQuestions: [],
        displayedQuestions: [],
    },
    reducers: {
        sortQuestionsByNewest(state) {
            state.displayedQuestions = [...state.allQuestions].sort((a, b) => {
                return new Date(b.created_at) - new Date(a.created_at);
            });
        },
        sortQuestionsByScore(state) {
            state.displayedQuestions = [...state.allQuestions].sort((a, b) => {
                return b.votes_score - a.votes_score;
            });
        },
        filterQuestionsByUnanswered(state) {
            state.displayedQuestions = state.allQuestions.filter(
                (question) => question.answers_count === 0
            );
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllQuestions.fulfilled, (state, action) => {
                state.allQuestions = action.payload;
                state.displayedQuestions = action.payload;
            })
            .addCase(getAllQuestions.rejected, (state, action) => {})
            .addCase(deleteQuestion.fulfilled, (state, action) => {
                state.loading = false;
                state.allQuestions = state.allQuestions.filter(
                    (vote) => vote.id === action.payload
                );
            })
            .addCase(deleteQuestion.rejected, (state, action) => {
                state.loading = false;
            });
    },
});

export const getAllQuestions = createAsyncThunk(
    'questions/getAllQuestions',
    async (_, { rejectWithValue }) => {
        const response = await fetch('/api/questions', {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();

        if (!response.ok) {
            rejectWithValue(data);
        }

        return data.questions;
    }
);

export const deleteQuestion = createAsyncThunk(
    'questions/deleteQuestion',
    async (questionId, { rejectWithValue }) => {
        const response = await fetch(`/api/questions/${questionId}`, {
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

export const {
    sortQuestionsByNewest,
    sortQuestionsByScore,
    filterQuestionsByUnanswered,
} = questionsSlice.actions;

export default questionsSlice.reducer;
