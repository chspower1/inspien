import styled from "styled-components";
import { Row } from "../assets/style/common";
import type { Directory, File } from "../store/Mockup";

interface ItemProps {
  isTitle?: boolean;
  item?: Directory | File;
}

const Item = ({ item, isTitle }: ItemProps) => {
  return isTitle ? (
    <ItemWrapper>
      <Name isTitle>이름</Name>
      <FileSize isTitle>파일크기</FileSize>
      <Time isTitle>수정시간</Time>
    </ItemWrapper>
  ) : item?.type === "FILE" ? (
    <Row>
      <Name>{item?.name}</Name>
      <FileSize>{item?.type === "FILE" && item?.file_size}</FileSize>
      <Time>{item?.type === "FILE" && item?.modified_date}</Time>
    </Row>
  ) : null;
};
export default Item;
const ItemWrapper = styled(Row)`
  width: 1000px;
  height: 80px;
`;
const Element = styled(Row)<{ isTitle?: boolean }>`
  height: 80px;
  background-color: ${({ theme }) => theme.main};
  color: ${({ isTitle }) => (isTitle ? "white" : "black")};
  border: 1px solid white;
`;
const Name = styled(Element)`
  width: 350px;
`;
const FileSize = styled(Element)`
  width: 250px;
`;
const Time = styled(Element)`
  width: 400px;
`;
