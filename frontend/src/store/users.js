import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const answerSlice = createSlice({
    name:'users',
    initialState: {
        allUsers: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getAllAnswers.fulfilled, (state, action)=> {
            state.allUsers = action.payload;
        })
        .addCase(getAllUsers.rejected, (state, action)=> {
            console.log('Rejected with value:', action.payload);
        });
    },
});

export const getAllUsers = createAsyncThunk(
    'users/getAllUsers',
    async (_, {rejectWithValue}) => {
        const response = await fetch('/api/users', {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if(!response.ok) {
            rejectWithValue(await response.json())
        }
        const data = await response.json()
        console.log('data', data)
        return data.users;
    }
);

export default userSlice.reducer