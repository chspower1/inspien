import styled from "styled-components";
import { Row } from "../assets/style/common";
import { FileSize, Name, Time } from "./Item";

const ItemTitle = () => {
  return (
    <ItemTitleWrapper>
      <Name>파일 이름</Name>
      <FileSize>파일 크기</FileSize>
      <Time>최근 수정된 날짜</Time>
    </ItemTitleWrapper>
  );
};
export default ItemTitle;

const ItemTitleWrapper = styled(Row)`
  width: 100%;
  height: 60px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;
