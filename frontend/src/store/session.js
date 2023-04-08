import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const sessionSlice = createSlice({
    name: 'session',
    initialState: {
        user: null,
        loading: false,
        error: null,
        validationErrors: null,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        removeUser: (state) => {
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(authenticate.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
            })
            .addCase(signUp.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.validationErrors = null;
            })
            .addCase(signUp.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.error = null;
                state.validationErrors = null;
            })
            .addCase(signUp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
                state.validationErrors = action.payload.errors;
                state.user = null;
            });
    },
});

export const authenticate = createAsyncThunk(
    'session/authenticate',
    async () => {
        const response = await fetch('/api/auth/', {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            const data = await response.json();

            if (data.errors) {
                return;
            }

            return data;
        }
    }
);

export const login = createAsyncThunk(
    'session/login',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                if (data.errors) {
                    return rejectWithValue({ errors: data.errors });
                }
            }

            return data.user;
        } catch (error) {
            return rejectWithValue({ message: error.message });
        }
    }
);

export const logout = createAsyncThunk('session/logout', async () => {
    const response = await fetch('/api/auth/logout', {
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        return true;
    }
});

export const signUp = createAsyncThunk(
    'session/signUp',
    async ({ username, email, password }, { rejectWithValue }) => {
        try {
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                if (data.errors) {
                    return rejectWithValue({ errors: data.errors });
                }
            }

            return data.user;
        } catch (error) {
            return rejectWithValue({ message: error.message });
        }
    }
);

export const { setUser, removeUser } = sessionSlice.actions;

export default sessionSlice.reducer;
