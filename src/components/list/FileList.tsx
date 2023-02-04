import { useState, useEffect } from "react";
import styled from "styled-components";
import { Col } from "../../assets/style/common";
import { Button } from "../../assets/style/content";
import usePortal from "../../hooks/usePortal";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  selectCurrentDir,
  selectCurrentFile,
  selectCurrentServerId,
  setCurrentDir,
  setCurrentFile,
} from "../../store/slice/currentInfoSlice";
import DropBox from "../drop-box/DropBox";
import Item from "../Item";
import AddItemModal from "../modals/AddItemModal";
import DeleteItemModal from "../modals/DeleteItemModal";
import UpdateItemModal from "../modals/UpdateItemModal";

interface FileListProps {}
const FileList = () => {
  // state
  const [isShowDropBox, setIsShowDropBox] = useState(false);
  const [dropBox, setDropBox] = useState({
    x: 0,
    y: 0,
  });
  // redux
  const currentDir = useAppSelector((state) => selectCurrentDir(state));
  const currentFile = useAppSelector((state) => selectCurrentFile(state));
  const dispatch = useAppDispatch();

  // modal
  const { Portal: AddFilePortal, setIsMount: setIsMountAddFile } = usePortal();
  const { Portal: DeleteFilePortal, setIsMount: setIsMountDeleteFile } = usePortal();
  const { Portal: UpdateFilePortal, setIsMount: setIsMountUpdateFile } = usePortal();

  const handleClickDeleteOrUpdateButton = (mode: "DELETE" | "UPDATE") => {
    // 파일을 선택하지 않았을 때 예외처리
    if (currentFile.name === undefined) return alert("파일을 선택해 주세요!");
    setIsMountDeleteFile(mode === "DELETE");
    setIsMountUpdateFile(mode === "UPDATE");
  };
  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const x = e.clientX;
    const y = e.clientY;
    setDropBox({
      x: x,
      y: y,
    });
    setIsShowDropBox(true);
    console.log(x, y);
  };
  useEffect(() => {}, [dropBox]);
  return (
    <Wrapper
      onContextMenu={handleContextMenu}
      onClick={() => {
        setIsShowDropBox(false);
      }}
    >
      <Button onClick={() => setIsMountAddFile(true)}>추가</Button>
      <Button onClick={() => handleClickDeleteOrUpdateButton("UPDATE")}>수정</Button>
      <Button isDelete onClick={() => handleClickDeleteOrUpdateButton("DELETE")}>
        삭제
      </Button>
      {currentDir.children?.map(
        (item) =>
          item.type === "FILE" && (
            <div
              key={currentDir.parent + currentDir.name + item.name}
              onClick={() => dispatch(setCurrentFile({ name: item.name, parent: currentDir.name }))}
            >
              <Item isActive={currentFile.name === item.name} item={item} />
            </div>
          )
      )}
      {isShowDropBox && <DropBox x={dropBox.x} y={dropBox.y} setIsMount={setIsShowDropBox} />}
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
