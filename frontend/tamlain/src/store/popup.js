import { createSlice } from "@reduxjs/toolkit";

const initialPopupSlice = { isOk: false };

const popupSlice = createSlice({
  name: "popup",
  initialState: initialPopupSlice,
  reducers: {
    popupOk(state) {
      state.isOk = !state.isOk;
    },
  },
});

export const popupActions = popupSlice.actions;

export default popupSlice.reducer;
