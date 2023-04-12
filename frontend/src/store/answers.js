import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const answerSlice = createSlice({
    name: 'answers',
    initialState: {
        allAnswers: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllAnswers.fulfilled, (state, action) => {
                state.allAnswers = action.payload;
            })
            .addCase(getAllAnswers.rejected, (state, action) => {
                console.log('Rejected with value:', action.payload);
            })
            .addCase(createAnswerByQuestion.fulfilled, (state, action) => {
                const createdAnswer = action.payload;

                state.allAnswers.push(createdAnswer);
            })
            .addCase(createAnswerByQuestion.rejected, (state, action) => {
    
                console.log('Rejected with value:', action.payload);
            })
            .addCase(updateAnswerByQuestion.fulfilled, (state, action) => {
                const updatedAnswer = action.payload;
                const idx = state.allAnswers.findIndex(
                    (answer) => answer.id === updatedAnswer.id
                );
                state.allAnswers[idx] = updatedAnswer;
            })
            .addCase(updateAnswerByQuestion.rejected, (state, action) => {
                console.log('Rejected with value:', action.payload);
            })
            .addCase(deleteAnswer.fulfilled, (state, action) => {
                state.allAnswers = state.allAnswers.fileter(
                    (answer) => answer.id === action.payload
                );
            })
            .addCase(deleteAnswer.rejected, (state, action) => {
                console.log('Rejected with value:', action.payload);
            });
    },
});

export const getAllAnswers = createAsyncThunk(
    'answers/getAllAnswers',
    async (_, { rejectWithValue }) => {
        const response = await fetch('/api/answers/', {
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        if (!response.ok) {
            rejectWithValue(await response.json());
        }

        const data = await response.json();

        return data.Answers;
    }
);

export const getAnswersByQuestion = createAsyncThunk(
    'answers/getAnswersByQuestion',
    async (questionId, { rejectWithValue }) => {
        const response = await fetch(`/api/questions/${questionId}/answers`, {
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        if (!response.ok) {
            rejectWithValue(await response.json());
        }

        const data = await response.json();
        return data.Answers;
    }
);

export const createAnswerByQuestion = createAsyncThunk(
    '/answers/createAnswerByQuestion',
    async ({ details,questionId }, { rejectWithValue }) => {
        const response = await fetch(`/api/questions/${questionId}/answers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        body: JSON.stringify( details ),
        });

        if (!response.ok) {
            rejectWithValue(await response.json());
        }

        const data = await response.json();

        return data;
    }
);

export const updateAnswerByQuestion = createAsyncThunk(
    'answers/updateAnswerByQuestion',
    async ({ details, answerId}, { rejectWithValue }) => {
        const response = await fetch(`/api/answers/${answerId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify( details ),
        });
        if (!response.ok) {
            rejectWithValue(await response.json());
        }

        const data = await response.json();

        return data;
    }
);
export const deleteAnswer = createAsyncThunk(
    'answers/deleteAnswer',
    async (answerId, { rejectWithValue }) => {
        const response = await fetch(`/api//answers/${answerId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            rejectWithValue(await response.json());
        }

        const data = await response.json();

        return data.Answers;
    }
);

export default answerSlice.reducer;
