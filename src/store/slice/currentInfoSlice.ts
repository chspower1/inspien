import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Children } from "../Mockup";

interface CurrentInfoState {
  value: {
    directory: CurrentDir;
    file: CurrentFile;
    server: CurrentServer;
  };
}
interface CurrentDir {
  name: string;
  parent: string | undefined;
  children: Children;
}
interface CurrentFile {
  name: undefined | string;
  parent: undefined | string;
}
interface CurrentServer {
  id: number | undefined;
}
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
      id: undefined,
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
export default currentInfoSlice.reducer;
