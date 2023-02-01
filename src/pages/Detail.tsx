import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { Col, Row } from "../assets/style/common";
import Item from "../components/Item";
import AddFileModal from "../components/modals/AddFileModal";
import usePortal from "../hooks/usePortal";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import type { Children, Directory } from "../store/Mockup";
import DirectoryIcon from "../assets/img/directory_icon.png";
import DeleteFileModal from "../components/modals/DeleteFileModal";
import { checkDirInChildren } from "../utils/checkDirInChildren";
import DirectoryList from "../components/detail/DirectoryList";
import FileList from "../components/detail/FileList";

const Detail = () => {
  const { id } = useParams();

  // Redux
  const data = useAppSelector((state) =>
    state.data.directories.find((server) => server.id === parseInt(id!))
  );

  return (
    <>
      <Link to="/">
        <BackButton>뒤로가기</BackButton>
      </Link>
      <Row>
        {data && <DirectoryList data={data} />}
        <FileList />
      </Row>
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
