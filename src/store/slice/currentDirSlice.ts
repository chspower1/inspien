import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../configureStore";
import { Children } from "../Mockup";

interface CurrentDirState {
  name: string;
  parent: string | undefined;
  children: Children;
  selectedFile: string | null;
}
const initialState: CurrentDirState = {
  name: "/",
  parent: undefined,
  children: [],
  selectedFile: null,
};

const currentDirSlice = createSlice({
  name: "currentDirSlice",
  initialState,
  reducers: {
    setCurrentDir: (state, action: PayloadAction<CurrentDirState>) => {
      state = action.payload;
    },
  },
});

export const { setCurrentDir } = currentDirSlice.actions;
export default currentDirSlice.reducer;
