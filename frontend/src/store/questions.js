import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const questionsSlice = createSlice({
    name: 'questions',
    initialState: {
        allQuestions: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // .addCase(getAllQuestions.pending, (state) => {
            // })
            .addCase(getAllQuestions.fulfilled, (state, action) => {
                state.allQuestions = action.payload;
            })
            .addCase(getAllQuestions.rejected, (state, action) => {
                console.log('Rejected with value:', action.payload);
            })
            .addCase(deleteQustion.fulfilled, (state, action) => {
                state.loading = false;
                state.allQuestions = state.allQuestions.filter(
                    (vote) => vote.id === action.payload
                );
            })
            .addCase(deleteQustion.rejected, (state, action) => {
                console.log('Rejected with value:', action.payload);
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

        if (!response.ok) {
            rejectWithValue(await response.json());
        }

        const data = await response.json();
        console.log('data:', data);

        return data.questions;
    }
);
export const deleteQustion = createAsyncThunk(
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
export default questionsSlice.reducer;
