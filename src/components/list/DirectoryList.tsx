import { useState } from "react";
import { Col, Row } from "../../assets/style/common";
import { TreeContainer } from "../../assets/style/content";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import usePortal from "../../hooks/usePortal";
import DirectoryTree from "../DirectoryTree";
import { selectServerData } from "../../store/slice/dataSlice";
import { selectCurrentDir } from "../../store/slice/currentInfoSlice";
import AddItemModal from "../modals/AddItemModal";
import DeleteItemModal from "../modals/DeleteItemModal";
import UpdateItemModal from "../modals/UpdateItemModal";
import styled from "styled-components";
import DropBox from "../DropBox";
import { selectDirectoryDropBox, setIsShowDropBox } from "../../store/slice/dropBoxSlice";
import ControllButtonBox from "../ControllButtonBox";
const DirectoryList = () => {
  // state
  const [dropBox, setDropBox] = useState({
    x: 0,
    y: 0,
  });
  // redux state
  const isShowDropBox = useAppSelector(selectDirectoryDropBox);
  const currentData = useAppSelector(selectServerData);
  const currentDir = useAppSelector(selectCurrentDir);
  const dispatch = useAppDispatch();

  // modal
  const { Portal: AddDirectoryPortal, setIsMount: setIsMountAddDirectory } = usePortal();
  const { Portal: UpdateDirectoryPortal, setIsMount: setIsMountUpdateDirectory } = usePortal();
  const { Portal: DeleteDirectoryPortal, setIsMount: setIsMountDeleteDirectory } = usePortal();

  // handler
  const handleClickDeleteButton = () => {
    dispatch(setIsShowDropBox("NONE"));
    // 최상위 폴더 삭제시도 시 예외처리
    if (currentDir.parent === undefined) return alert("최상위 폴더는 삭제할 수 없습니다.");
    if (currentDir.children.length > 0)
      return alert("하위에 폴더나 파일이 있으면 삭제할 수 없습니다!");
    setIsMountDeleteDirectory(true);
  };
  const handleClickUpdateButton = () => {
    dispatch(setIsShowDropBox("NONE"));
    // 최상위 폴더 수정시도 시 예외처리
    if (currentDir.parent === undefined) return alert("최상위 폴더는 수정할 수 없습니다.");
    if (currentDir.name) {
    }
    setIsMountUpdateDirectory(true);
  };
  const hadleClickAddButton = () => {
    dispatch(setIsShowDropBox("NONE"));
    // 폴더를 선택하지 않았을 때 예외처리
    if (currentDir.name === "" && currentDir.parent === undefined)
      return alert("폴더를 선택해주세요!");
    setIsMountAddDirectory(true);
  };
  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const x = e.clientX;
    const y = e.clientY;
    setDropBox({
      x: x,
      y: y,
    });
    dispatch(setIsShowDropBox("DIRECTORY"));
    console.log(x, y);
  };
  return (
    <Wrapper
      onContextMenu={handleContextMenu}
      onClick={() => {
        dispatch(setIsShowDropBox("NONE"));
      }}
    >
      <ControllButtonBox
        hadleClickAddButton={hadleClickAddButton}
        handleClickUpdateButton={handleClickUpdateButton}
        handleClickDeleteButton={handleClickDeleteButton}
      />
      <TreeContainer>
        <DirectoryTree children={currentData.directories} />
      </TreeContainer>

      {isShowDropBox && (
        <DropBox
          type="DIRECTORY"
          x={dropBox.x}
          y={dropBox.y}
          hadleClickAddButton={hadleClickAddButton}
          handleClickUpdateButton={handleClickUpdateButton}
          handleClickDeleteButton={handleClickDeleteButton}
        />
      )}
      <AddDirectoryPortal>
        <AddItemModal type="DIRECTORY" setIsMount={setIsMountAddDirectory} />
      </AddDirectoryPortal>
      <DeleteDirectoryPortal>
        <DeleteItemModal type="DIRECTORY" setIsMount={setIsMountDeleteDirectory} />
      </DeleteDirectoryPortal>
      <UpdateDirectoryPortal>
        <UpdateItemModal type="DIRECTORY" setIsMount={setIsMountUpdateDirectory} />
      </UpdateDirectoryPortal>
    </Wrapper>
  );
};
export default DirectoryList;

const Wrapper = styled(Col)`
  justify-content: flex-start;
  align-items: flex-start;
  width: 25%;
  height: 100%;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  overflow: scroll;
`;
