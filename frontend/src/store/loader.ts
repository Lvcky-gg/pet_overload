import { createSlice } from '@reduxjs/toolkit';
import { Middleware } from '@reduxjs/toolkit';
import { AnyAction } from 'redux';

const loadingSlice = createSlice({
    name: 'loading',
    initialState: {
        loading: false,
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
    },
});

export const { setLoading } = loadingSlice.actions;

export default loadingSlice.reducer;

interface LoadingAction extends AnyAction {
    type: string;
}

export const loadingMiddleware: Middleware =
    (store) => (next) => (action: LoadingAction) => {
        try {
            const { type } = action;

            if (type.endsWith('/pending')) {
                store.dispatch(setLoading(true));
            } else if (
                type.endsWith('/fulfilled') ||
                type.endsWith('/rejected')
            ) {
                store.dispatch(setLoading(false));
            }

            next(action);
        } catch (err) {}
    };
