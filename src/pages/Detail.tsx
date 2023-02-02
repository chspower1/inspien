import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { Row } from "../assets/style/common";
import DirectoryList from "../components/list/DirectoryList";
import FileList from "../components/list/FileList";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { selectCurrentServerId, setCurrentServer } from "../store/slice/currentInfoSlice";

const Detail = () => {
  // params
  const { id } = useParams();

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
          <>
            <DirectoryList />
            <FileList />
          </>
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
  background-color: ${({ theme }) => theme.main};
`;
