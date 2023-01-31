import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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
      const routeArr = sliceRoute({ currentParent, currentDir });
      let children: Children = state.value.directories[serverId - 1].directories.children;
      const indexArr: number[] = [];
      console.log(routeArr);
      routeArr.forEach((route) => {
        const index = children.findIndex(
          (item) => item.name === route && item.type === "DIRECTORY"
        );
        console.log(index);
        if (index > -1) {
          indexArr.push(index);
          const subDirectroty: Directory = children[index] as Directory;
          children = subDirectroty.children!;
        }
      });
      state.value.directories[serverId - 1].directories.children = [];
      const addFiledd = (children: Children, indexArr: number[]) => {
        if (indexArr) {
          const index = indexArr.pop() as number;
          addFiledd(children[index].children, indexArr);
        }
      };
      console.log(indexArr);
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
