import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../configureStore";
import { Children } from "../Mockup";

interface CurrentDirState {
  value: CurrentDir;
}
interface CurrentDir {
  name: string;
  parent: string | undefined;
  children: Children;
  selectedFile: string | null;
}
const initialState: CurrentDirState = {
  value: {
    name: "/",
    parent: undefined,
    children: [],
    selectedFile: null,
  },
};

const currentDirSlice = createSlice({
  name: "currentDirSlice",
  initialState,
  reducers: {
    setCurrentDir: (state, action: PayloadAction<CurrentDir>) => {
      console.log(action.payload);
      state.value = action.payload;
    },
  },
});

export const { setCurrentDir } = currentDirSlice.actions;
export default currentDirSlice.reducer;
