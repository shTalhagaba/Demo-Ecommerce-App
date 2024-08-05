import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  user: any;
  theme: 'light' | 'dark';
}

const initialState: AuthState = {
  token: null,
  user: null,
  theme: 'light',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<{token: string; user: any}>) {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    setTheme(state, action: PayloadAction<'light' | 'dark'>) {
      state.theme = action.payload;
    },
    loadState(state, action: PayloadAction<AuthState>) {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.theme = action.payload.theme;
    },
  },
});

export const {setToken, setTheme, loadState} = authSlice.actions;
export default authSlice.reducer;
