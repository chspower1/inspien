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
    },
    removeFile: (state, action: PayloadAction<DeleteResponse>) => {
      const { currentDir, targetName, serverId } = action.payload;
      const targetDirectory = searchInChildren(
        state.value.directories[serverId - 1].directories,
        currentDir.name,
        currentDir.parent
      );
      const targetIndex = targetDirectory?.children.findIndex((item) => item.name === targetName);
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
    updateDirectory: (state, action: PayloadAction<UpdateResponse>) => {
      const { currentDir, targetName, newName, serverId } = action.payload;

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

      // index가 있을경우 수정
      if (targetDirectory !== undefined && targetIndex !== undefined && targetIndex > -1) {
        console.log(targetDirectory?.children[targetIndex].name);
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
