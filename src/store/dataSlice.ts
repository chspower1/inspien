import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Item from "../components/Item";
import { searchInChildren } from "../utils/searchInChildren";
import { sliceRoute } from "../utils/sliceRoute";
import { RootState } from "./configureStore";
import { Children, Directory, File, MockupState } from "./Mockup";
const initialState = {
  value: MockupState,
};
interface AddFileResponse {
  serverId: number;
  currentParent: string | undefined;
  currentDir: string;
  file: File;
}
const dataSlice = createSlice({
  name: "dataSlice",
  initialState,
  reducers: {
    addFile: (state, action: PayloadAction<AddFileResponse>) => {
      const { currentDir, currentParent, file, serverId } = action.payload;
      const targetDirectory = searchInChildren(
        state.value.directories[serverId - 1].directories.children,
        currentDir,
        currentParent
      );
      targetDirectory?.children.push(file);
      console.log(targetDirectory?.name, targetDirectory?.parent);
    },
    removeFile: (state, action: PayloadAction<number>) => {},
    updateFile: (state, action: PayloadAction<Directory | File>) => {},
    addFolder: (state, action: PayloadAction<Directory | File>) => {},
    removeFolder: (state, action: PayloadAction<number>) => {},
    updateFolder: (state, action: PayloadAction<Directory | File>) => {},
  },
});

export const { addFile, removeFile, updateFile, addFolder, removeFolder, updateFolder } =
  dataSlice.actions;
export const selectCount = (state: RootState) => state.value;
export default dataSlice.reducer;
