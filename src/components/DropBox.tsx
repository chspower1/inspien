import styled from "styled-components";
import { Col, Row } from "../assets/style/common";
import { ReactComponent as DeleteIcon } from "../assets/img/delete.svg";
import { ReactComponent as UpdateIcon } from "../assets/img/update.svg";
import { ReactComponent as AddIcon } from "../assets/img/add.svg";
import { ItemType } from "../types/mockupData";
interface DropBoxProps {
  type: ItemType;
  x: number;
  y: number;
  hadleClickAddButton: () => void;
  handleClickUpdateButton: () => void;
  handleClickDeleteButton: () => void;
}
const DropBox = ({
  type,
  x,
  y,
  hadleClickAddButton,
  handleClickUpdateButton,
  handleClickDeleteButton,
}: DropBoxProps) => {
  const KOREAN_TYPE = {
    DIRECTORY: "폴더",
    FILE: "파일",
  };
  return (
    <Wrapper
      x={x}
      y={y}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <Menu onClick={hadleClickAddButton}>
        <Icon>
          <AddIcon />
        </Icon>
        {KOREAN_TYPE[type]} 생성
      </Menu>
      <Menu onClick={handleClickUpdateButton}>
        <Icon>
          <UpdateIcon />
        </Icon>
        {KOREAN_TYPE[type]} 수정
      </Menu>
      <Menu onClick={handleClickDeleteButton}>
        <Icon>
          <DeleteIcon />
        </Icon>
        {KOREAN_TYPE[type]} 삭제
      </Menu>
    </Wrapper>
  );
};
export default DropBox;
const Wrapper = styled(Col)<{ x: number; y: number }>`
  position: absolute;
  justify-content: flex-start;
  width: 200px;
  height: 150px;
  background-color: ${({ theme }) => theme.gray};
  left: ${({ x }) => x + "px"};
  top: ${({ y }) => y + "px"};
  padding: 5px;
`;
const Icon = styled(Row)`
  width: 16px;
  height: 16px;
  border-radius: 10px;
  margin: 0px 6px;
`;

const Menu = styled(Row)`
  justify-content: flex-start;
  width: 100%;
  height: 30px;
  cursor: pointer;
  color: ${({ theme }) => theme.text};
  transition: all 0.3s ease;
  &:hover {
    background-color: #d9d9d9;
  }
`;
const CancleButton = styled(Menu)`
  position: absolute;
  bottom: 0px;
  right: 0px;
  width: auto;
  padding: 6px 10px;
  border-radius: 10px;
`;
