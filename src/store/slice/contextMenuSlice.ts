import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ItemType } from "../../types/mockupData";
import { RootState } from "../configureStore";
interface ContextMenuState {
  value: {
    file: boolean;
    directory: boolean;
  };
}
const initialState: ContextMenuState = {
  value: {
    file: false,
    directory: false,
  },
};

const contextMenuSlice = createSlice({
  name: "ContextMenuSlice",
  initialState,
  reducers: {
    setIsShowContextMenu: (state, action: PayloadAction<ItemType | "NONE">) => {
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

export const { setIsShowContextMenu } = contextMenuSlice.actions;
export const selectFileContextMenu = (state: RootState) => state.contextMenu.value.file;
export const selectDirectoryContextMenu = (state: RootState) => state.contextMenu.value.directory;
export default contextMenuSlice.reducer;
