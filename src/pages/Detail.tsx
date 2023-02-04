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

const Detail = () => {
  // params
  const { id } = useParams();
  const currentDir = useAppSelector(selectCurrentDir);
  // Redux
  const serverId = useAppSelector(selectCurrentServerId);
  const dispatch = useAppDispatch();

  // update serverId
  useEffect(() => {
    console.log("serverId", id);
    if (id) {
      dispatch(setCurrentServer({ id: parseInt(id) }));
    }
  }, [id]);
  return (
    <>
      <Link to="/">
        <BackButton>뒤로가기</BackButton>
      </Link>
      <Row>
        {serverId && (
          <Col>
            <ContentTopBar>
              <img src={DirectoryIcon} style={{ margin: "0px 14px" }} alt="Dic" />
              {currentDir.name}
            </ContentTopBar>
            <Row>
              <DirectoryList />
              <FileList />
            </Row>
          </Col>
        )}
      </Row>
    </>
  );
};
export default Detail;

const BackButton = styled.button`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background-color: ${({ theme }) => theme.blue};
`;
const ContentTopBar = styled(Row)`
  justify-content: flex-start;
  width: 1460px;
  height: 50px;
  background-color: ${({ theme }) => theme.gray};
`;
