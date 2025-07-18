import { configureStore } from '@reduxjs/toolkit';
import authReducer, {authMiddleware} from './authSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authMiddleware),
});
