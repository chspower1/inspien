import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "./configureStore";
import { Children } from "./Mockup";
export interface CurrentDirState {
  currentDir: CurrentDir;
}
interface CurrentDir {
  name: string;
  parent: string | undefined;
  children: Children;
  selectedFile: string | null;
}
const initialState: CurrentDirState = {
  currentDir: {
    name: "/",
    parent: undefined,
    children: [],
    selectedFile: null,
  },
};

const currentDirSlice = createSlice({
  name: "dataSlice",
  initialState,
  reducers: {
    setCurrentDir: (state, action: PayloadAction<CurrentDir>) => {
      state.currentDir = action.payload;
    },
  },
});

// export const { addFile, removeFile, updateFile, addFolder, removeFolder, updateFolder } =
//   dirSlice.actions;
export const selectCount = (state: RootState) => state.currentDir;
export default currentDirSlice.reducer;
