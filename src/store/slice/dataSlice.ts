import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Response, AddResponse, DeleteResponse, UpdateResponse } from "../../types/slice/data";
import { searchInChildren } from "../../utils/searchInChildren";
import { sliceRoute } from "../../utils/sliceRoute";
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
      console.log(targetDirectory);
      const targetIndex = targetDirectory?.children.findIndex((item) => item.name === targetName);
      console.log(targetIndex);
      if (targetIndex !== undefined && targetIndex > -1) {
        targetDirectory?.children.splice(targetIndex, 1);
      }
    },
    removeDirectory: (state, action: PayloadAction<Response>) => {
      const { currentDir, serverId } = action.payload;

      // 선택된 상위폴더로 타겟 변경
      const newTarget = currentDir.parent?.split("/").pop();
      const parentArr = currentDir.parent?.split("/").slice(1, -1);
      let parent = "";
      if (parentArr?.length === 0) {
        parent = "/";
      } else {
        currentDir.parent
          ?.split("/")
          .slice(1, -1)
          .forEach((i) => (parent = parent + "/" + i));
      }
      // depth가 2이하일 경우 전체 데이터로 조회
      const targetDirectory = newTarget
        ? searchInChildren(state.value.directories[serverId - 1].directories, newTarget!, parent)
        : state.value.directories[serverId - 1].directories[0];

      // 타겟 index 조회
      const targetIndex = targetDirectory?.children.findIndex(
        (item) => item.name === currentDir.name
      );

      // index가 있을경우 삭제
      if (targetIndex !== undefined && targetIndex > -1) {
        targetDirectory?.children.splice(targetIndex, 1);
      }
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
