import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

/*
    Create the session slice of state for the redux store. 
*/
export const sessionSlice = createSlice({
    name: 'session',
    initialState: { user: null },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        removeUser: (state) => {
            state.user = null;
        },
    },
    /* 
		Extra reducers are used for async thunks
	*/
    extraReducers: (builder) => {
        builder
            .addCase(authenticate.fulfilled, (state, action) => {
                if (action.payload) {
                    state.user = action.payload;
                }
            })
            .addCase(login.fulfilled, (state, action) => {
                if (action.payload) {
                    state.user = action.payload;
                }
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
            })
            .addCase(signUp.fulfilled, (state, action) => {
                if (action.payload) {
                    state.user = action.payload;
                }
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
    async ({ email, password }) => {
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

        if (response.ok) {
            const data = await response.json();
            return data;
        } else if (response.status < 500) {
            const data = await response.json();
            if (data.errors) {
                throw new Error(data.errors);
            }
        } else {
            throw new Error('An error occurred. Please try again.');
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
    async ({ username, email, password }) => {
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

        if (response.ok) {
            const data = await response.json();

            return data;
        } else if (response.status < 500) {
            const data = await response.json();

            if (data.errors) {
                throw new Error(data.errors);
            }
        } else {
            throw new Error('An error occurred. Please try again.');
        }
    }
);

export const { setUser, removeUser } = sessionSlice.actions;

export default sessionSlice.reducer;
