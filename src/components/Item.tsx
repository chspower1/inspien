import { useState } from "react";
import dayjs from "dayjs";
import styled from "styled-components";
import { Row } from "../assets/style/common";
import { Directory, File } from "../types/mockupData";

interface ItemProps {
  item: File;
  isActive?: boolean;
}

const Item = ({ item, isActive = false }: ItemProps) => {
  return (
    <ItemWrapper className={isActive ? "active" : "normal"}>
      <Name>{item?.name}</Name>
      <FileSize>{item?.file_size}</FileSize>
      <Time>{dayjs(item?.modified_date).format("YYYY-MM-DD HH:mm:ss")}</Time>
    </ItemWrapper>
  );
};
export default Item;
const ItemWrapper = styled(Row)`
  width: 1000px;
  height: 80px;
  cursor: pointer;
  background-color: white;
  color: ${({ theme }) => theme.text};
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
