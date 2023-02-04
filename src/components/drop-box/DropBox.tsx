import styled from "styled-components";
import { Col, Row } from "../../assets/style/common";
interface DropBoxProps {
  x: number;
  y: number;
  setIsMount: React.Dispatch<React.SetStateAction<boolean>>;
  setIsMountAddFile: (value: React.SetStateAction<boolean>) => void;
  handleClickDeleteOrUpdateButton: (mode: "DELETE" | "UPDATE") => void;
}
const DropBox = ({
  x,
  y,
  setIsMount,
  setIsMountAddFile,
  handleClickDeleteOrUpdateButton,
}: DropBoxProps) => {
  return (
    <Wrapper
      x={x}
      y={y}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <Menu onClick={() => setIsMountAddFile(true)}>
        <PlusIcon>+</PlusIcon>파일 생성
      </Menu>
      <Menu onClick={() => handleClickDeleteOrUpdateButton("UPDATE")}>
        <svg
          width="20"
          height="13"
          viewBox="0 0 14 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.9856 1.39611L11.0444 0.455C10.4378 -0.151667 9.45 -0.151667 8.84333 0.455L6.75889 2.53944L0 9.29833V12.4406H3.14222L9.94 5.64278L11.9856 3.59722C12.6 2.99056 12.6 2.00278 11.9856 1.39611ZM2.49667 10.885H1.55556V9.94389L8.29111 3.20833L9.23222 4.14944L2.49667 10.885ZM6.22222 12.4406L9.33333 9.32944H14V12.4406H6.22222Z"
            fill="#4674CC"
          />
        </svg>
        파일 수정
      </Menu>
      <Menu onClick={() => handleClickDeleteOrUpdateButton("DELETE")}>
        <svg
          width="20"
          height="16"
          viewBox="0 0 13 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.928571 14.2222C0.928571 15.2 1.76429 16 2.78571 16H10.2143C11.2357 16 12.0714 15.2 12.0714 14.2222V3.55556H0.928571V14.2222ZM13 0.888889H9.75L8.82143 0H4.17857L3.25 0.888889H0V2.66667H13V0.888889Z"
            fill="#BC5151"
          />
        </svg>
        파일 삭제
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
