import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { sliceRoute } from "../utils/sliceRoute";
import { RootState } from "./configureStore";
import { Directory, File, MockupState } from "./Mockup";
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
      console.log(
        state.value.directories
          .find((server) => server.id === serverId)
          ?.directories.children.forEach((item) => {
            if (item.type === "DIRECTORY") {
              if (item.name === currentDir && item.parent === currentParent) {
                item.children.push(file);
              }
            }
          })
      );
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
