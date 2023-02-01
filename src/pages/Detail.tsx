import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { Row } from "../assets/style/common";
import DirectoryList from "../components/list/DirectoryList";
import FileList from "../components/list/FileList";
import { useAppSelector } from "../store/hooks";

const Detail = () => {
  const { id } = useParams();

  // Redux
  const data = useAppSelector((state) =>
    state.data.value.directories.find((server) => server.id === parseInt(id!))
  );

  return (
    <>
      <Link to="/">
        <BackButton>뒤로가기</BackButton>
      </Link>
      <Row>
        {data && <DirectoryList data={data} />}
        <FileList serverId={parseInt(id!)} />
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
