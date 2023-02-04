import { useState } from "react";
import styled from "styled-components";
import { Col } from "../../assets/style/common";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  selectCurrentDir,
  selectCurrentFile,
  setCurrentFile,
} from "../../store/slice/currentInfoSlice";
import { selectFileContextMenu, setIsShowContextMenu } from "../../store/slice/contextMenuSlice";
import ControllButtonBox from "../ControllButtonBox";
import ContextMenu from "../ContextMenu";
import Item from "../Item";
import ItemTitle from "../ItemTitle";
import AddItemModal from "../modals/AddItemModal";
import DeleteItemModal from "../modals/DeleteItemModal";
import UpdateItemModal from "../modals/UpdateItemModal";
import { AnimatePresence } from "framer-motion";

const FileList = () => {
  // state
  const [contextMenu, setContextMenu] = useState({
    x: 0,
    y: 0,
  });
  // redux
  const currentDir = useAppSelector(selectCurrentDir);
  const currentFile = useAppSelector(selectCurrentFile);
  const isShowContextMenu = useAppSelector(selectFileContextMenu);
  const dispatch = useAppDispatch();

  // modal
  const [isMountAddFile, setIsMountAddFile] = useState(false);
  const [isMountDeleteFile, setIsMountDeleteFile] = useState(false);
  const [isMountUpdateFile, setIsMountUpdateFile] = useState(false);
  // handle
  const handleClickDeleteOrUpdateButton = (mode: "DELETE" | "UPDATE") => {
    dispatch(setIsShowContextMenu("NONE"));
    // 파일을 선택하지 않았을 때 예외처리
    if (currentFile.name === undefined) return alert("파일을 선택해 주세요!");
    setIsMountDeleteFile(mode === "DELETE");
    setIsMountUpdateFile(mode === "UPDATE");
  };

  const handleClickAddButton = () => {
    dispatch(setIsShowContextMenu("NONE"));
    setIsMountAddFile(true);
  };
  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const x = e.clientX;
    const y = e.clientY;
    setContextMenu({
      x: x,
      y: y,
    });
    dispatch(setIsShowContextMenu("FILE"));
  };

  return (
    <Wrapper
      onContextMenu={handleContextMenu}
      onClick={() => {
        dispatch(setIsShowContextMenu("NONE"));
      }}
    >
      <ControllButtonBox
        handleClickDeleteButton={() => {
          handleClickDeleteOrUpdateButton("DELETE");
        }}
        handleClickUpdateButton={() => {
          handleClickDeleteOrUpdateButton("UPDATE");
        }}
        hadleClickAddButton={handleClickAddButton}
      />
      <ItemTitle />
      {currentDir.children?.map(
        (item) =>
          item.type === "FILE" && (
            <div
              style={{ width: "100%" }}
              key={currentDir.parent + currentDir.name + item.name}
              onClick={() => dispatch(setCurrentFile({ name: item.name, parent: currentDir.name }))}
              onContextMenu={() =>
                dispatch(setCurrentFile({ name: item.name, parent: currentDir.name }))
              }
            >
              <Item isActive={currentFile.name === item.name} item={item} />
            </div>
          )
      )}
      <AnimatePresence>
        {isShowContextMenu && (
          <ContextMenu
            type="FILE"
            x={contextMenu.x}
            y={contextMenu.y}
            handleClickDeleteButton={() => {
              handleClickDeleteOrUpdateButton("DELETE");
            }}
            handleClickUpdateButton={() => {
              handleClickDeleteOrUpdateButton("UPDATE");
            }}
            hadleClickAddButton={handleClickAddButton}
          />
        )}
      </AnimatePresence>
      <AddItemModal type="FILE" isMount={isMountAddFile} setIsMount={setIsMountAddFile} />
      <DeleteItemModal type="FILE" isMount={isMountDeleteFile} setIsMount={setIsMountDeleteFile} />
      <UpdateItemModal type="FILE" isMount={isMountUpdateFile} setIsMount={setIsMountUpdateFile} />
    </Wrapper>
  );
};
export default FileList;

const Wrapper = styled(Col)`
  width: 75%;
  height: 100%;
  justify-content: flex-start;
  overflow: scroll;
`;
