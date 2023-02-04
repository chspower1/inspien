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
export const ItemWrapper = styled(Row)`
  width: 1000px;
  height: 80px;
  cursor: pointer;
  background-color: white;
  color: ${({ theme }) => theme.text};
  transition: all 0.3s ease;
  &:hover {
    background-color: ${({ theme }) => theme.gray};
  }
  &.active {
    background-color: ${({ theme }) => theme.gray};
  }
`;
export const Element = styled(Row)`
  height: 80px;
`;
export const Name = styled(Element)`
  width: 350px;
`;
export const FileSize = styled(Element)`
  width: 250px;
`;
export const Time = styled(Element)`
  width: 400px;
`;
