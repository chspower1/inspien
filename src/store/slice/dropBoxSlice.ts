import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ItemType } from "../../types/mockupData";
import { RootState } from "../configureStore";
interface DropBoxState {
  value: {
    file: boolean;
    directory: boolean;
  };
}
const initialState: DropBoxState = {
  value: {
    file: false,
    directory: false,
  },
};

const dropBoxSlice = createSlice({
  name: "dropBoxSlice",
  initialState,
  reducers: {
    setIsShowDropBox: (state, action: PayloadAction<ItemType | "NONE">) => {
      if (action.payload === "DIRECTORY") {
        state.value = {
          directory: true,
          file: false,
        };
      } else if (action.payload === "FILE") {
        state.value = {
          directory: false,
          file: true,
        };
      } else {
        state.value = {
          directory: false,
          file: false,
        };
      }
    },
  },
});

export const { setIsShowDropBox } = dropBoxSlice.actions;
export const selectFileDropBox = (state: RootState) => state.dropBox.value.file;
export const selectDirectoryDropBox = (state: RootState) => state.dropBox.value.directory;
export default dropBoxSlice.reducer;
