import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';

// Domain slices for merchant, store, transaction, settlement,
// notification, settings and ui are added here as the app expands.
export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
