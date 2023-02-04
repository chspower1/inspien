import styled from "styled-components";
import { Col, Row } from "../assets/style/common";
import { ReactComponent as DeleteIcon } from "../assets/img/delete.svg";
import { ReactComponent as UpdateIcon } from "../assets/img/update.svg";
import { ItemType } from "../types/mockupData";
interface DropBoxProps {
  type: ItemType;
  x: number;
  y: number;
  setIsMount: React.Dispatch<React.SetStateAction<boolean>>;
  hadleClickAddButton: () => void;
  handleClickUpdateButton: () => void;
  handleClickDeleteButton: () => void;
}
const DropBox = ({
  type,
  x,
  y,
  setIsMount,
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
        <PlusIcon>+</PlusIcon>
        {KOREAN_TYPE[type]} 생성
      </Menu>
      <Menu onClick={handleClickUpdateButton}>
        <UpdateIcon />
        {KOREAN_TYPE[type]} 수정
      </Menu>
      <Menu onClick={handleClickDeleteButton}>
        <DeleteIcon />
        {KOREAN_TYPE[type]} 삭제
      </Menu>
      <CancleButton onClick={() => setIsMount(false)}>
        <CancleIcon>x</CancleIcon>취소
      </CancleButton>
    </Wrapper>
  );
};
export default DropBox;
const Wrapper = styled(Col)<{ x: number; y: number }>`
  position: absolute;
  justify-content: flex-start;
  width: 200px;
  height: 200px;
  background-color: ${({ theme }) => theme.gray};
  left: ${({ x }) => x + "px"};
  top: ${({ y }) => y + "px"};
  padding: 5px;
`;
const PlusIcon = styled(Row)`
  width: 16px;
  height: 16px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.blue};
  color: white;
  margin: 0px 2px;
`;
const CancleIcon = styled(PlusIcon)`
  background-color: ${({ theme }) => theme.red};
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
