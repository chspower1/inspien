import { useState } from "react";
import dayjs from "dayjs";
import styled from "styled-components";
import { Row } from "../assets/style/common";
import { Directory, File } from "../types/mockupData";

interface ItemProps {
  isTitle?: boolean;
  item?: Directory | File;
  isActive?: boolean;
}

const Item = ({ item, isTitle, isActive = false }: ItemProps) => {
  return isTitle ? (
    <ItemWrapper isTitle>
      <Name>이름</Name>
      <FileSize>파일크기</FileSize>
      <Time>수정시간</Time>
    </ItemWrapper>
  ) : item?.type === "FILE" ? (
    <ItemWrapper className={isActive ? "active" : "normal"}>
      <Name>{item?.name}</Name>
      <FileSize>{item?.type === "FILE" && item?.file_size}</FileSize>
      <Time>
        {item?.type === "FILE" && dayjs(item?.modified_date).format("YYYY-MM-DD HH:mm:ss")}
      </Time>
    </ItemWrapper>
  ) : null;
};
export default Item;
const ItemWrapper = styled(Row)<{ isTitle?: boolean }>`
  width: 1000px;
  height: 80px;
  cursor: pointer;
  background-color: ${({ theme, isTitle }) => (isTitle ? theme.main : "#DAE3F3")};
  color: ${({ isTitle }) => (isTitle ? "white" : "black")};
  &:hover {
    background-color: #9eb2db;
  }
  &.active {
    background-color: #7e94c0;
  }
`;
const Element = styled(Row)`
  height: 80px;

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
