import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Response, AddResponse, DeleteResponse, UpdateResponse } from "../../types/slice/data";
import { searchInChildren } from "../../utils/searchInChildren";
import { RootState } from "../configureStore";
import { MockupState } from "../Mockup";

const initialState = {
  value: MockupState,
};

const dataSlice = createSlice({
  name: "dataSlice",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<AddResponse>) => {
      const { currentDir, newItem, serverId } = action.payload;

      const targetDirectory = searchInChildren(
        state.value.directories[serverId - 1].directories,
        currentDir.name,
        currentDir.parent
      );
      targetDirectory?.children.push(newItem);
      console.log(targetDirectory?.name, targetDirectory?.parent);
    },
    removeItem: (state, action: PayloadAction<DeleteResponse>) => {
      const { currentDir, targetName, serverId } = action.payload;
      console.log(currentDir, targetName, serverId);
      const targetDirectory = searchInChildren(
        state.value.directories[serverId - 1].directories,
        currentDir.name,
        currentDir.parent
      );

      const targetIndex = targetDirectory?.children.findIndex((item) => item.name === targetName);
      console.log(targetIndex);
      if (targetIndex !== undefined && targetIndex > -1) {
        targetDirectory?.children.splice(targetIndex, 1);
      }
    },
    removeDirectory: (state, action: PayloadAction<Response>) => {
      const { currentDir, serverId } = action.payload;
const parent = currentDir.parent
      const targetDirectory = searchInChildren(
        state.value.directories[serverId - 1].directories,
        currentDir.name,
        currentDir.parent
      );
    },
    updateItem: (state, action: PayloadAction<UpdateResponse>) => {
      const { currentDir, targetName, newName, serverId } = action.payload;
      const targetDirectory = searchInChildren(
        state.value.directories[serverId - 1].directories,
        currentDir.name,
        currentDir.parent
      );
      targetDirectory?.children.forEach((item) => {
        if (item.name === targetName) {
          item.name = newName;
        }
      });
    },
  },
});

export const { addItem, removeItem, updateItem, removeDirectory } = dataSlice.actions;
export const selectServerData = (state: RootState) =>
  state.data.value.directories[state.currentInfo.value.server.id! - 1];
export default dataSlice.reducer;
