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

export default questionsSlice.reducer;
