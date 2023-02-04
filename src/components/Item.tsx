import dayjs from "dayjs";
import styled from "styled-components";
import { Row } from "../assets/style/common";
import { File } from "../types/mockupData";
import { ReactComponent as FileIcon } from "../assets/img/file.svg";
import "dayjs/locale/ko";
interface ItemProps {
  item: File;
  isActive?: boolean;
}

const Item = ({ item, isActive = false }: ItemProps) => {
  return (
    <ItemWrapper className={isActive ? "active" : "normal"}>
      <Name>
        <FileIcon />
        {item?.name}
      </Name>
      <FileSize>{item?.file_size} KB</FileSize>
      <Time>{dayjs(item?.modified_date).locale("ko").format("YYYY년 MMMM D일 dddd A h:mm")}</Time>
    </ItemWrapper>
  );
};
export default Item;
export const ItemWrapper = styled(Row)`
  width: 100%;
  height: 60px;
  cursor: pointer;
  background-color: white;
  color: ${({ theme }) => theme.text};
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  &:hover {
    background-color: ${({ theme }) => theme.gray};
  }
  &.active {
    background-color: ${({ theme }) => theme.gray};
  }
`;
export const Element = styled(Row)`
  justify-content: flex-start;
  height: 60px;
  margin-left: 40px;
`;
export const Name = styled(Element)`
  width: 35%;
  gap: 10px;
`;
export const FileSize = styled(Element)`
  width: 25%;
`;
export const Time = styled(Element)`
  width: 40%;
`;
