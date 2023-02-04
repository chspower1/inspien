import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  CurrentDir,
  CurrentFile,
  CurrentInfoState,
  CurrentServer,
} from "../../types/slice/currentInfo";
import { RootState } from "../configureStore";

const initialState: CurrentInfoState = {
  value: {
    directory: {
      name: "/",
      parent: undefined,
      children: [],
    },
    file: {
      name: undefined,
      parent: undefined,
    },
    server: {
      id: 1,
    },
  },
};

const currentInfoSlice = createSlice({
  name: "currentDirSlice",
  initialState,
  reducers: {
    setCurrentDir: (state, action: PayloadAction<CurrentDir>) => {
      state.value.directory = action.payload;
    },
    setCurrentFile: (state, action: PayloadAction<CurrentFile>) => {
      state.value.file = action.payload;
    },
    setCurrentServer: (state, action: PayloadAction<CurrentServer>) => {
      state.value.server = action.payload;
    },
  },
});

export const { setCurrentDir, setCurrentFile, setCurrentServer } = currentInfoSlice.actions;
export const selectCurrentParent = (state: RootState) => state.currentInfo.value;
export const selectCurrentDir = (state: RootState) => state.currentInfo.value.directory;
export const selectCurrentFile = (state: RootState) => state.currentInfo.value.file;
export const selectCurrentServerId = (state: RootState) => state.currentInfo.value.server.id;
export default currentInfoSlice.reducer;
