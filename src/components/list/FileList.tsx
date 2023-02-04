import { useState, useEffect } from "react";
import styled from "styled-components";
import { Col } from "../../assets/style/common";
import usePortal from "../../hooks/usePortal";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  selectCurrentDir,
  selectCurrentFile,
  setCurrentFile,
} from "../../store/slice/currentInfoSlice";
import { selectFileDropBox, setIsShowDropBox } from "../../store/slice/dropBoxSlice";
import DropBox from "../DropBox";
import Item from "../Item";
import ItemTitle from "../ItemTitle";
import AddItemModal from "../modals/AddItemModal";
import DeleteItemModal from "../modals/DeleteItemModal";
import UpdateItemModal from "../modals/UpdateItemModal";

const FileList = () => {
  // state
  const [dropBox, setDropBox] = useState({
    x: 0,
    y: 0,
  });
  // redux
  const currentDir = useAppSelector(selectCurrentDir);
  const currentFile = useAppSelector(selectCurrentFile);
  const isShowDropBox = useAppSelector(selectFileDropBox);
  const dispatch = useAppDispatch();

  // modal
  const { Portal: AddFilePortal, setIsMount: setIsMountAddFile } = usePortal();
  const { Portal: DeleteFilePortal, setIsMount: setIsMountDeleteFile } = usePortal();
  const { Portal: UpdateFilePortal, setIsMount: setIsMountUpdateFile } = usePortal();

  // handle
  const handleClickDeleteOrUpdateButton = (mode: "DELETE" | "UPDATE") => {
    dispatch(setIsShowDropBox("NONE"));
    // 파일을 선택하지 않았을 때 예외처리
    if (currentFile.name === undefined) return alert("파일을 선택해 주세요!");
    setIsMountDeleteFile(mode === "DELETE");
    setIsMountUpdateFile(mode === "UPDATE");
  };

  const handleClickAddButton = () => {
    dispatch(setIsShowDropBox("NONE"));
    setIsMountAddFile(true);
  };
  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const x = e.clientX;
    const y = e.clientY;
    setDropBox({
      x: x,
      y: y,
    });
    dispatch(setIsShowDropBox("FILE"));
    console.log(x, y);
  };

  return (
    <Wrapper
      onContextMenu={handleContextMenu}
      onClick={() => {
        dispatch(setIsShowDropBox("NONE"));
      }}
    >
      <ItemTitle />
      {currentDir.children?.map(
        (item) =>
          item.type === "FILE" && (
            <div
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
      {isShowDropBox && (
        <DropBox
          type="FILE"
          x={dropBox.x}
          y={dropBox.y}
          setIsMount={() => {
            dispatch(setIsShowDropBox("NONE"));
          }}
          handleClickDeleteButton={() => {
            handleClickDeleteOrUpdateButton("DELETE");
          }}
          handleClickUpdateButton={() => {
            handleClickDeleteOrUpdateButton("UPDATE");
          }}
          hadleClickAddButton={handleClickAddButton}
        />
      )}
      <AddFilePortal>
        <AddItemModal type="FILE" setIsMount={setIsMountAddFile} />
      </AddFilePortal>
      <DeleteFilePortal>
        <DeleteItemModal type="FILE" setIsMount={setIsMountDeleteFile} />
      </DeleteFilePortal>
      <UpdateFilePortal>
        <UpdateItemModal type="FILE" setIsMount={setIsMountUpdateFile} />
      </UpdateFilePortal>
    </Wrapper>
  );
};
export default FileList;

const Wrapper = styled(Col)`
  width: 1000px;
  height: 1000px;
  justify-content: flex-start;
`;
