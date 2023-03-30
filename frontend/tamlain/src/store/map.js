import { createSlice } from "@reduxjs/toolkit";

const initialMapState = {
  selectArr: [],
};

//로그인 관련된 state요소들을 최신화 하는 slice (initialLoginState에 있는 state들을 최신화하는 코드)
const mapSlice = createSlice({
  name: "map",
  initialState: initialMapState,
  reducers: {
    setArr(state, actions) {
      state.selectArr = actions.payload;
    },
  },
});

export const mapActions = mapSlice.actions;

//전체다 하지말고 리듀서만 임포트하기 위해
export default mapSlice.reducer;
