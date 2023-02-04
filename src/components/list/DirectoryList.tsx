import { useState } from "react";
import { Col } from "../../assets/style/common";
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
import ContextMenu from "../ContextMenu";
import ControllButtonBox from "../ControllButtonBox";
import {
  selectDirectoryContextMenu,
  setIsShowContextMenu,
} from "../../store/slice/contextMenuSlice";

const DirectoryList = () => {
  // state
  const [contextMenu, setContextMenu] = useState({
    x: 0,
    y: 0,
  });
  // redux state
  const isShowContextMenu = useAppSelector(selectDirectoryContextMenu);
  const currentData = useAppSelector(selectServerData);
  const currentDir = useAppSelector(selectCurrentDir);
  const dispatch = useAppDispatch();

  // modal
  const { Portal: AddDirectoryPortal, setIsMount: setIsMountAddDirectory } = usePortal();
  const { Portal: UpdateDirectoryPortal, setIsMount: setIsMountUpdateDirectory } = usePortal();
  const { Portal: DeleteDirectoryPortal, setIsMount: setIsMountDeleteDirectory } = usePortal();

  // handler
  const handleClickDeleteButton = () => {
    dispatch(setIsShowContextMenu("NONE"));
    // 최상위 폴더 삭제시도 시 예외처리
    if (currentDir.parent === undefined) return alert("최상위 폴더는 삭제할 수 없습니다.");
    if (currentDir.children.length > 0)
      return alert("하위에 폴더나 파일이 있으면 삭제할 수 없습니다!");
    setIsMountDeleteDirectory(true);
  };
  const handleClickUpdateButton = () => {
    dispatch(setIsShowContextMenu("NONE"));
    // 최상위 폴더 수정시도 시 예외처리
    if (currentDir.parent === undefined) return alert("최상위 폴더는 수정할 수 없습니다.");
    if (currentDir.name) {
    }
    setIsMountUpdateDirectory(true);
  };
  const hadleClickAddButton = () => {
    dispatch(setIsShowContextMenu("NONE"));
    // 폴더를 선택하지 않았을 때 예외처리
    if (currentDir.name === "" && currentDir.parent === undefined)
      return alert("폴더를 선택해주세요!");
    setIsMountAddDirectory(true);
  };
  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const x = e.clientX;
    const y = e.clientY;
    setContextMenu({
      x: x,
      y: y,
    });
    dispatch(setIsShowContextMenu("DIRECTORY"));
  };
  return (
    <Wrapper
      onContextMenu={handleContextMenu}
      onClick={() => {
        dispatch(setIsShowContextMenu("NONE"));
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

      {isShowContextMenu && (
        <ContextMenu
          type="DIRECTORY"
          x={contextMenu.x}
          y={contextMenu.y}
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
