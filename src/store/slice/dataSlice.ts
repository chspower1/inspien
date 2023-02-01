import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Item from "../../components/Item";
import { searchInChildren } from "../../utils/searchInChildren";
import { RootState } from "../configureStore";
import { Children, Directory, File, MockupState } from "../Mockup";

interface FileResponse {
  serverId: number;
  currentParent: string | undefined;
  currentDir: string;
}
interface AddFileResponse extends FileResponse {
  file: File;
}
interface DeleteFileResponse extends FileResponse {
  fileName: string;
}
interface UpdateFileResponse extends FileResponse {
  oldName: string;
  newName: string;
}
const initialState = {
  value: MockupState,
};

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
    removeFile: (state, action: PayloadAction<DeleteFileResponse>) => {
      const { currentDir, currentParent, fileName, serverId } = action.payload;
      const targetDirectory = searchInChildren(
        state.value.directories[serverId - 1].directories.children,
        currentDir,
        currentParent
      );
      const targetIndex = targetDirectory?.children.findIndex((item) => item.name === fileName);
      console.log(targetIndex);
      if (targetIndex !== undefined && targetIndex > -1) {
        targetDirectory?.children.splice(targetIndex, 1);
      }
    },
    updateFile: (state, action: PayloadAction<UpdateFileResponse>) => {
      const { currentDir, currentParent, oldName, newName, serverId } = action.payload;
      const targetDirectory = searchInChildren(
        state.value.directories[serverId - 1].directories.children,
        currentDir,
        currentParent
      );
      targetDirectory?.children.forEach((item) => {
        if (item.name === oldName) {
          item.name = newName;
        }
      });
    },
    addDirectory: (state, action: PayloadAction<Directory | File>) => {},
    removeDirectory: (state, action: PayloadAction<number>) => {},
    updateDirectory: (state, action: PayloadAction<Directory | File>) => {},
  },
});

export const { addFile, removeFile, updateFile, addDirectory, removeDirectory, updateDirectory } =
  dataSlice.actions;
export default dataSlice.reducer;
