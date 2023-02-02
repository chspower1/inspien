import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Item from "../../components/Item";
import { CurrentDir } from "../../types/currentInfo";
import { searchInChildren } from "../../utils/searchInChildren";
import { RootState } from "../configureStore";
import { Children, Directory, File, MockupState } from "../Mockup";

interface Response {
  serverId: number;
  currentDir: CurrentDir;
}
interface AddResponse extends Response {
  newItem: File | Directory;
}
interface DeleteResponse extends Response {
  targetName: string;
}
interface UpdateResponse extends DeleteResponse {
  targetName: string;
  newName: string;
}

interface AddDirectoryResponse extends Response {
  newDir: Directory;
  children: Children;
}
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
        state.value.directories[serverId - 1].directories.children,
        currentDir.name,
        currentDir.parent
      );
      targetDirectory?.children.push(newItem);
      console.log(targetDirectory?.name, targetDirectory?.parent);
    },
    removeItem: (state, action: PayloadAction<DeleteResponse>) => {
      const { currentDir, targetName, serverId } = action.payload;
      const targetDirectory = searchInChildren(
        state.value.directories[serverId - 1].directories.children,
        currentDir.name,
        currentDir.parent
      );
      const targetIndex = targetDirectory?.children.findIndex((item) => item.name === targetName);
      console.log(targetIndex);
      if (targetIndex !== undefined && targetIndex > -1) {
        targetDirectory?.children.splice(targetIndex, 1);
      }
    },
    updateItem: (state, action: PayloadAction<UpdateResponse>) => {
      const { currentDir, targetName, newName, serverId } = action.payload;
      const targetDirectory = searchInChildren(
        state.value.directories[serverId - 1].directories.children,
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

export const { addItem, removeItem, updateItem } = dataSlice.actions;
export const selectServerData = (state: RootState) =>
  state.data.value.directories[state.currentInfo.value.server.id! - 1];
export default dataSlice.reducer;
