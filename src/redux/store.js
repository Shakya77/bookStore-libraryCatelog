import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/AuthSlice.jsx';

export const store = configureStore({
    reducer: {
        auth: authSlice,
    },
});
