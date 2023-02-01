import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { Col, Row } from "../assets/style/common";
import Item from "../components/Item";
import AddFileModal from "../components/modals/AddFileModal";
import usePortal from "../hooks/usePortal";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import type { Children, Directory } from "../store/Mockup";
import fileIcon from "../assets/img/file_icon.png";
import DirectoryIcon from "../assets/img/directory_icon.png";
export interface CurrentDirInfo {
  name: string;
  parent: string | undefined;
  children: Children;
  selectedFile: string | null;
}
const Detail = () => {
  const { id } = useParams();

  // Redux
  const data = useAppSelector((state) =>
    state.value.directories.find((server) => server.id === parseInt(id!))
  );
  const dispatch = useAppDispatch();

  const [currentDirInfo, setCurrentDirInfo] = useState<CurrentDirInfo>({
    name: "/",
    parent: undefined,
    children: [],
    selectedFile: null,
  });
  // Modal
  const { Portal: AddFilePortal, setIsMount: setIsMountAddFile } = usePortal();
  const { Portal: AddFolderPortal, setIsMount: setIsMountAddFolder } = usePortal();

  const handleClickDirectory = (item: Directory) => {
    const { name, parent, children } = item;
    setCurrentDirInfo({
      name,
      parent,
      children,
      selectedFile: null,
    });
  };
  const paintTree = (children: Children) => {
    return children.map((item) => {
      if (item.type === "DIRECTORY")
        return (
          <TreeItemBox key={item.parent + item.name}>
            <DirectoryItem
              className={
                currentDirInfo.name === item.name && currentDirInfo.parent === item.parent
                  ? "active"
                  : "normal"
              }
              onClick={() => handleClickDirectory(item)}
            >
              <OpenOrCloseButton>+</OpenOrCloseButton>
              <img src={DirectoryIcon} alt="Dic" />
              {item.name}
            </DirectoryItem>
            <TreeItemBox>{paintTree(item.children)}</TreeItemBox>
          </TreeItemBox>
        );
      else
        return (
          <TreeItemBox key={item.name + item.modified_date}>
            <DirectoryItem>
              <img src={fileIcon} alt="File" />
              {item.name}
            </DirectoryItem>
          </TreeItemBox>
        );
    });
  };

  const handleClickButton = (mode: "ADD" | "DELETE" | "UPDATE") => {
    setIsMountAddFile(mode === "ADD" && true);
  };
  console.log(data);
  return (
    <>
      <Link to="/">
        <BackButton>뒤로가기</BackButton>
      </Link>
      <Row>
        <Col>
          <ButtonBox>
            <Button>추가</Button>
            <Button onClick={() => handleClickButton("UPDATE")}>수정</Button>
            <Button isDelete onClick={() => handleClickButton("DELETE")}>
              삭제
            </Button>
          </ButtonBox>

          {paintTree(data?.directories.children!)}
        </Col>
        <div>
          <Button onClick={() => handleClickButton("ADD")}>추가</Button>
          <Item isTitle />
          {currentDirInfo.children?.map(
            (item) =>
              item.type === "FILE" && (
                <div
                  onClick={() => setCurrentDirInfo({ ...currentDirInfo, selectedFile: item.name })}
                >
                  <Item isActive={currentDirInfo.selectedFile === item.name} item={item} />
                </div>
              )
          )}
        </div>
      </Row>
      <AddFilePortal
        children={
          <AddFileModal
            serverId={parseInt(id!)}
            currentDir={currentDirInfo.name}
            currentParent={currentDirInfo.parent}
            setIsMountAddFile={setIsMountAddFile}
            setCurrentDirInfo={setCurrentDirInfo}
          />
        }
      />
    </>
  );
};
export default Detail;

const BackButton = styled.button`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background-color: ${({ theme }) => theme.main};
`;
const ButtonBox = styled(Row)`
  gap: 10px;
`;
const Button = styled.button<{ isDelete?: boolean }>`
  width: 100px;
  height: 60px;
  border-radius: 6px;
  background-color: ${({ theme, isDelete }) => (isDelete ? theme.danger : theme.main)};
  color: white;
`;
const TreeItemBox = styled.div`
  position: relative;
  margin-left: 10px;
`;
const DirectoryItem = styled(Row)`
  justify-content: flex-start;
  width: auto;
  padding: 0px 10px;
  height: 35px;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background-color: #f1f1f1;
  }
  &.active {
    background-color: #e4e4e4;
  }
`;
const OpenOrCloseButton = styled.button`
  position: absolute;
  left: -26px;
  width: 26px;
  height: 26px;
  background-color: ${({ theme }) => theme.main};
  color: white;
  margin-right: 10px;
`;
