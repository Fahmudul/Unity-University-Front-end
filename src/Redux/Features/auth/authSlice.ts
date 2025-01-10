import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
type TAuthState = {
  user: null | object;
  token: null | string;
};
const initialState: TAuthState = {
  user: null,
  token: null,
};
const authSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.token = token;
      state.user = user;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const selectUser = (state: RootState) => {
  return state.auth.user;
};
export const selectToken = (state: RootState) => {
  return state.auth.token;
};

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
