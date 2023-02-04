import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { Col, Row } from "../assets/style/common";
import DirectoryList from "../components/list/DirectoryList";
import FileList from "../components/list/FileList";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import DirectoryIcon from "../assets/img/directory_icon.png";
import {
  selectCurrentDir,
  selectCurrentServerId,
  setCurrentServer,
} from "../store/slice/currentInfoSlice";
import { ReactComponent as BackIcon } from "../assets/img/arrow_back.svg";

const Detail = () => {
  // params
  const { id } = useParams();

  // Redux
  const currentDir = useAppSelector(selectCurrentDir);
  const serverId = useAppSelector(selectCurrentServerId);
  const dispatch = useAppDispatch();

  // update serverId
  useEffect(() => {
    if (id) {
      dispatch(setCurrentServer({ id: parseInt(id) }));
    }
  }, [id]);
  return (
    <>
      <Link to="/">
        <BackButton>
          <BackIcon />
        </BackButton>
      </Link>
      {serverId && (
        <ExplorerWrapper>
          <ExplorerTopBar>
            <img src={DirectoryIcon} style={{ margin: "0px 14px" }} alt="Dic" />
            {currentDir.name || "폴더를 선택해주세요!"}
          </ExplorerTopBar>
          <ExplorerOptionBar></ExplorerOptionBar>
          <ExplorerContainer>
            <DirectoryList />
            <FileList />
          </ExplorerContainer>
        </ExplorerWrapper>
      )}
    </>
  );
};
export default Detail;

const ExplorerWrapper = styled(Col)`
  width: 1200px;
  height: 600px;
  margin: auto;
  box-shadow: 5px 5px 10px 2px rgba(0, 0, 0, 0.2);
  border: 1px solid gray;
  border-radius: 10px;
  background-color: white;
`;
const BackButton = styled.button`
  position: absolute;
  top: 20px;
  left: 20px;
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background-color: ${({ theme }) => theme.blue};
`;
const ExplorerTopBar = styled(Row)`
  justify-content: flex-start;
  width: 100%;
  height: 50px;
  background-color: ${({ theme }) => theme.gray};
  border-radius: 10px 10px 0px 0px;
`;
const ExplorerOptionBar = styled(ExplorerTopBar)`
  height: 60px;
  border: 0px;
`;

const ExplorerContainer = styled(Row)`
  width: 100%;
  height: 100%;
`;
