import { useState } from "react";
import dayjs from "dayjs";
import styled from "styled-components";
import { Row } from "../assets/style/common";
import { Directory, File } from "../types/mockupData";
import { FileSize, ItemWrapper, Name, Time } from "./Item";

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
  width: 1000px;
  height: 80px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;
