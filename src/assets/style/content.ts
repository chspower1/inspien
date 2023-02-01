import styled from "styled-components";
import { Row } from "./common";

export const BackButton = styled.button`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background-color: ${({ theme }) => theme.main};
`;
export const ButtonBox = styled(Row)`
  gap: 10px;
`;
export const Button = styled.button<{ isDelete?: boolean }>`
  width: 100px;
  height: 60px;
  border-radius: 6px;
  background-color: ${({ theme, isDelete }) => (isDelete ? theme.danger : theme.main)};
  color: white;
`;
export const TreeItemBox = styled.div`
  position: relative;
  margin-left: 10px;
`;
export const DirectoryItem = styled(Row)`
  justify-content: flex-start;
  width: auto;
  padding: 0px 10px;
  height: 35px;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background-color: #f1f1f1;
  }
  &.active {
    background-color: #e4e4e4;
  }
`;
export const OpenOrCloseButton = styled.button`
  position: absolute;
  left: -26px;
  width: 26px;
  height: 26px;
  background-color: ${({ theme }) => theme.main};
  color: white;
  margin-right: 10px;
`;
