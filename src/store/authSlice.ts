import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type AuthState = {
  token: string | null;
  mobile: string | null;
  onboardingComplete: boolean;
};

const initialState: AuthState = {
  token: null,
  mobile: null,
  onboardingComplete: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setMobile(state, action: PayloadAction<string>) {
      state.mobile = action.payload;
    },
    setToken(state, action: PayloadAction<string | null>) {
      state.token = action.payload;
    },
    setOnboardingComplete(state, action: PayloadAction<boolean>) {
      state.onboardingComplete = action.payload;
    },
    logout(state) {
      state.token = null;
      state.mobile = null;
    },
  },
});

export const { setMobile, setToken, setOnboardingComplete, logout } = authSlice.actions;
export default authSlice.reducer;
