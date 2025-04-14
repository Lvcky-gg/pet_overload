import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const sessionSlice = createSlice({
    name: 'session',
    initialState: {
        user: null,
        error: null as string | null,
        validationErrors: null as Record<string, string> | null | undefined,
        redirectMessage: null,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        removeUser: (state) => {
            state.user = null;
        },
        clearErrors: (state) => {
            state.error = null;
            state.validationErrors = null;
        },
        setRedirectMessage: (state, action) => {
            state.redirectMessage = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(authenticate.fulfilled, (state, action) => {
                state.user = action.payload;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload;
                state.error = null;
                state.validationErrors = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.error =
                    (action.payload as LoginRejectedValue).message ?? null;
                state.validationErrors = action.payload?.errors ?? null;
                state.user = null;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
            })
            .addCase(signUp.pending, (state) => {
                state.error = null;
                state.validationErrors = null;
            })
            .addCase(signUp.fulfilled, (state, action) => {
                state.user = action.payload;
                state.error = null;
                state.validationErrors = null;
            })
            .addCase(signUp.rejected, (state, action) => {
                state.error =
                    (action.payload as LoginRejectedValue).message ?? null;
                state.validationErrors = (
                    action.payload as LoginRejectedValue
                ).errors;
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
            credentials: 'include',
        });
        if (response.ok) {
            const data = await response.json();

            if (data.errors) {
                return;
            }

            return data.user;
        }
    }
);

interface LoginPayload {
    email: string;
    password: string;
}

interface LoginRejectedValue {
    message?: string;
    errors?: Record<string, string>;
}

export const login = createAsyncThunk<
    any, // Replace with the actual user type if known
    LoginPayload,
    { rejectValue: LoginRejectedValue }
>('session/login', async ({ email, password }, { rejectWithValue }) => {
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
        if (error instanceof Error) {
            return rejectWithValue({ message: 'An unknown error occurred' });
        }
    }
});

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

interface SignUpPayload {
    username: string;
    email: string;
    password: string;
}

export const signUp = createAsyncThunk<
    any, // Replace with the actual user type if known
    SignUpPayload,
    { rejectValue: LoginRejectedValue }
>(
    'session/signUp',
    async (
        { username, email, password }: SignUpPayload,
        { rejectWithValue }
    ) => {
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
            return rejectWithValue({ message: (error as Error)?.message });
        }
    }
);

export const { setUser, removeUser, clearErrors, setRedirectMessage } =
    sessionSlice.actions;

export default sessionSlice.reducer;
