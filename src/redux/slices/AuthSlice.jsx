import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: false,
};

const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = action.payload;
        },
    },
});

export const { login } = AuthSlice.actions;

export default AuthSlice.reducer;