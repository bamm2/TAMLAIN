import { createSlice } from "@reduxjs/toolkit";

const initialLoginState = {
  code: "",
  isAuthenticated: false,
  loginToggle: false,
};

const loginSlice = createSlice({
  name: "login",
  initialState: initialLoginState,
  reducers: {
    kakaoLogin(state, action) {
      state.code = action.payload;
    },
    login(state) {
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
    },
    toggleLogin(state) {
      state.loginToggle = !state.loginToggle;
    },
  },
});

export const loginActions = loginSlice.actions;

export default loginSlice.reducer;
