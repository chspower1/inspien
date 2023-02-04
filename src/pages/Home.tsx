import { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Col, Row } from "../assets/style/common";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setCurrentDir } from "../store/slice/currentInfoSlice";

const Home = () => {
  // redux
  const data = useAppSelector((state) => state.data.value.directories);
  const dispatch = useAppDispatch();

  // 홈으로 진입시 현재 디렉토리 초기화
  useEffect(() => {
    dispatch(
      setCurrentDir({
        name: "",
        children: [],
        parent: undefined,
      })
    );
  }, []);
  return (
    <HomeWrapper>
      <HomeTitle>서버를 선택해주세요!</HomeTitle>
      <ServerBox>
        {data.map(({ id }) => (
          <Link to={`server/${id}`} key={id}>
            <Server>server #{id}</Server>
          </Link>
        ))}
      </ServerBox>
    </HomeWrapper>
  );
};
export default Home;
const HomeWrapper = styled(Col)`
  width: 100vw;
  height: 100vh;
`;
const HomeTitle = styled.h1`
  font-size: 32px;
`;
const ServerBox = styled(Row)`
  display: flex;
  flex-wrap: wrap;
  width: 100vw;
  height: 500px;
  gap: 20px;
`;
const Server = styled(Row)`
  width: 200px;
  height: 200px;
  background-color: ${({ theme }) => theme.blue};
  color: white;
  border-radius: 10px;
  transition: all 0.3s ease;
  &:hover {
    background-color: ${({ theme }) => theme.blue};
    width: 210px;
    height: 210px;
  }
`;
