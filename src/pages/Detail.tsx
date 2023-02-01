import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { Col, Row } from "../assets/style/common";
import Item from "../components/Item";
import AddFileModal from "../components/modals/AddFileModal";
import usePortal from "../hooks/usePortal";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import type { Children, Directory } from "../store/Mockup";

export interface CurrentDirInfo {
  name: string;
  parent: string | undefined;
  children: Children;
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
    });
  };
  const paintTree = (children: Children) => {
    return children.map((item) => {
      if (item.type === "DIRECTORY")
        return (
          <>
            <div>
              <div onClick={() => handleClickDirectory(item)}>
                <svg
                  width="32"
                  height="26"
                  viewBox="0 0 32 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M28.8 3.2H16L12.8 0H3.2C1.44 0 0.016 1.44 0.016 3.2L0 22.4C0 24.16 1.44 25.6 3.2 25.6H28.8C30.56 25.6 32 24.16 32 22.4V6.4C32 4.64 30.56 3.2 28.8 3.2ZM28.8 22.4H3.2V6.4H28.8V22.4Z"
                    fill="#4472C4"
                  />
                </svg>
                {item.name}
              </div>
              <SubDirectory>{paintTree(item.children)}</SubDirectory>
            </div>
          </>
        );
      else
        return (
          <SubDirectory>
            <svg
              width="27"
              height="34"
              viewBox="0 0 27 34"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.6667 0H3.33333C1.4974 0 0 1.4974 0 3.33333V30C0 31.8359 1.4974 33.3333 3.33333 33.3333H23.3333C25.1693 33.3333 26.6667 31.8359 26.6667 30V10L16.6667 0ZM24.1667 11.6667H15V2.5L24.1667 11.6667Z"
                fill="#4472C4"
              />
            </svg>

            {item.name}
          </SubDirectory>
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
            <Button onClick={() => handleClickButton("ADD")}>추가</Button>
            <Button onClick={() => handleClickButton("UPDATE")}>수정</Button>
            <Button isDelete onClick={() => handleClickButton("DELETE")}>
              삭제
            </Button>
          </ButtonBox>
          {paintTree(data?.directories.children!)}
        </Col>
        <div>
          <Button>추가</Button>
          <input type="text" />
          <button onClick={() => {}}>추가</button>
          <Item isTitle />
          {currentDirInfo.children?.map((item) => item.type === "FILE" && <Item item={item} />)}
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
const SubDirectory = styled.div`
  margin-left: 10px;
`;
