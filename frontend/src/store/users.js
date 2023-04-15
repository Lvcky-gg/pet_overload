import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'users',
    initialState: {
        allUsers: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.allUsers = action.payload;
            })
    },
});

export const getAllUsers = createAsyncThunk(
    'users/getAllUsers',
    async (_, { rejectWithValue }) => {
        const response = await fetch('/api/users/', {
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        if (!response.ok) {
            rejectWithValue(await response.json());
        }
        const data = await response.json();
        return data.users;
    }
);

export default userSlice.reducer;
