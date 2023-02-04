import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Response, AddResponse, DeleteResponse, UpdateResponse } from "../../types/slice/data";
import { changeTargetToParent } from "../../utils/changeTargetToParent";
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
      // payload
      const {
        currentDir: { name, parent },
        newItem,
        serverId,
      } = action.payload;

      // serverData
      const serverData = state.value.directories[serverId - 1].directories;

      // Add Item
      const targetDirectory = searchInChildren(serverData, name, parent);
      targetDirectory?.children.push(newItem);
    },
    removeFile: (state, action: PayloadAction<DeleteResponse>) => {
      // payload
      const {
        currentDir: { name, parent },
        targetName,
        serverId,
      } = action.payload;

      // serverData
      const serverData = state.value.directories[serverId - 1].directories;

      // target 디렉토리 추적
      const targetDirectory = searchInChildren(serverData, name, parent);
      const targetIndex = targetDirectory?.children.findIndex((item) => item.name === targetName);

      // Delete File
      if (targetIndex !== undefined && targetIndex > -1) {
        targetDirectory?.children.splice(targetIndex, 1);
      }
    },
    removeDirectory: (state, action: PayloadAction<Response>) => {
      const { currentDir, serverId } = action.payload;

      // 현재 디렉토리의 상위디렉토리로 타겟 변경
      const targetDirectory = changeTargetToParent(
        currentDir,
        state.value.directories[serverId - 1]
      );

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
    updateDirectory: (state, action: PayloadAction<UpdateResponse>) => {
      const { currentDir, newName, serverId } = action.payload;

      // 현재 디렉토리의 상위디렉토리로 타겟 변경
      const targetDirectory = changeTargetToParent(
        currentDir,
        state.value.directories[serverId - 1]
      );

      // 타겟 index 조회
      const targetIndex = targetDirectory?.children.findIndex(
        (item) => item.name === currentDir.name
      );

      // index가 있을경우 수정
      if (targetDirectory !== undefined && targetIndex !== undefined && targetIndex > -1) {
        targetDirectory.children[targetIndex].name = newName;
      }
    },
  },
});

export const { addItem, removeFile, updateItem, removeDirectory, updateDirectory } =
  dataSlice.actions;
export const selectServerData = (state: RootState) =>
  state.data.value.directories[state.currentInfo.value.server.id! - 1];
export default dataSlice.reducer;
