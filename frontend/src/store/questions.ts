import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const questionsSlice = createSlice({
    name: 'questions',
    initialState: {
        allQuestions: [] as {
            id: number;
            created_at: string;
            votes_score: number;
            answers_count: number;
        }[],
        error: null as string | null,
        displayedQuestions: [] as {
            id: number;
            created_at: string;
            votes_score: number;
            answers_count: number;
        }[],
        loading: false,
    },
    reducers: {
        sortQuestionsByNewest(state) {
            state.displayedQuestions = [...state.allQuestions].sort((a, b) => {
                return (
                    new Date(b.created_at).getTime() -
                    new Date(a.created_at).getTime()
                );
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
        updateQuestionAfterVote(state, action) {
            const updatedQuestion = action.payload;
            const idx = state.allQuestions.findIndex(
                (question) => question.id === updatedQuestion.id
            );
            state.allQuestions[idx] = updatedQuestion;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllQuestions.fulfilled, (state, action) => {
                state.allQuestions = action.payload;
                state.error = null;
                state.displayedQuestions = action.payload;
            })
            .addCase(getAllQuestions.rejected, (state, action) => {})
            .addCase(createQuestion.fulfilled, (state, action) => {
                state.allQuestions.push(action.payload);
                state.displayedQuestions.push(action.payload);
                state.error = null;
            })
            .addCase(deleteQuestion.fulfilled, (state, action) => {
                state.loading = false;
                state.allQuestions = state.allQuestions.filter(
                    (vote) => vote.id !== action.payload
                );
                state.error = null;
            })
            .addCase(deleteQuestion.rejected, (state, action) => {
                state.loading = false;
                state.error = (action.payload as { error: string }).error;
            })
            .addCase(filterQuestions.fulfilled, (state, action) => {
                state.loading = false;
                state.allQuestions = [...action.payload];
                state.error = null;
            })
            .addCase(filterQuestions.rejected, (state, action) => {
                state.loading = false;
                state.error = (action.payload as { error: string }).error;
                state.allQuestions = [];
            })
            .addCase(updateQuestion.fulfilled, (state, action) => {
                state.loading = false;
                const updateQuestion = action.payload;
                const idx = state.allQuestions.findIndex(
                    (question) => question.id === updateQuestion.id
                );
                state.allQuestions[idx] = updateQuestion;
            });

        //duplicate?
        //.addCase(deleteQuestion.rejected, (state, action) => {});
    },
});

export const getAllQuestions = createAsyncThunk(
    'questions/getAllQuestions',
    async (_, { rejectWithValue }) => {
        const response = await fetch('/api/questions/', {
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        const data = await response.json();

        if (!response.ok) {
            return rejectWithValue(await response.json());
        }

        return data.questions;
    }
);

export const createQuestion = createAsyncThunk(
    'questions/createQuestion',
    async (
        { title, details }: { title: string; details: string },
        { rejectWithValue }
    ) => {
        const response = await fetch('/api/questions/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, details }),
        });

        const data = await response.json();

        if (!response.ok) {
            return rejectWithValue(data);
        }

        return data;
    }
);

export const filterQuestions = createAsyncThunk(
    'questions/filterQuestions',
    async (parameter, { rejectWithValue }) => {
        const response = await fetch(`/api/questions${parameter}`);
        if (!response.ok) {
            return rejectWithValue(await response.json());
        }
        const data = await response.json();

        return data.questions;
    }
);
//duplicate?
//export const deleteQustion = createAsyncThunk(

export const deleteQuestion = createAsyncThunk(
    'questions/deleteQuestion',
    async (questionId: number, { rejectWithValue }) => {
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

export const updateQuestion = createAsyncThunk(
    'questions/updateQuestion',
    async (
        {
            title,
            details,
            questionId,
        }: { title: string; details: string; questionId: number },
        { rejectWithValue }
    ) => {
        const response = await fetch(`/api/questions/${questionId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, details }),
        });
        if (!response.ok) {
            rejectWithValue(await response.json());
        }

        const data = await response.json();

        return data;
    }
);

export const {
    sortQuestionsByNewest,
    sortQuestionsByScore,
    filterQuestionsByUnanswered,
    updateQuestionAfterVote,
} = questionsSlice.actions;

export default questionsSlice.reducer;
