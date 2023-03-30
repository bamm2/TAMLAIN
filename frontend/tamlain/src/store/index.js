import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./KakaoLogin";

const store = configureStore({
  reducer: {
    login: loginReducer,
  },
});

export default store;
