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
            // .addCase(createAnswerByQuestion.fulfilled, (state, action)=> {
            //     const updatedAnswer = action.payload;
            //     const idx = state.allAnswers.findIndex(
            //         (answer) => answer.id ===
            //     )

            // })
    },
});

export const getAllAnswers = createAsyncThunk(
    'answers/getAllAnswers',
    async (_, { rejectWithValue }) => {
        const response = await fetch('api/answers', {
            headers: {
                'Content-Type': 'application/json',
            },
            //source of bug
            // credentials: 'include',
        });

        if (!response.ok) {
            rejectWithValue(await response.json());
        }
        const data = await response.json();
        console.log('data', data);
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
        });

        if (!response.ok) {
            rejectWithValue(await response.json());
        }

        const data = await response.json();
        console.log(`Answers to question ${questionId}`, data.Answers);


        return data.Answers;

    }
);

export const createAnswerByQuestion = createAsyncThunk(
    'answers/createAnswerByQuestion',
    async (questionId, {rejectWithValue}) => {
        const response = await fetch(`/api/questions/${questionId}/answers`, {
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            }


        });
        if (!response.ok) {
            rejectWithValue(await response.json());
        }

        const data = await response.json();
        console.log(`Answers to question ${questionId}`, data.Answers);


        return data.Answers;
    }
);

export default answerSlice.reducer;
