import { Row } from "../assets/style/common";
import { ReactComponent as AddIcon } from "../assets/img/add.svg";
import { ReactComponent as UpdateIcon } from "../assets/img/update.svg";
import { ReactComponent as DeleteIcon } from "../assets/img/delete.svg";
import styled from "styled-components";
interface ControllButtonBoxProps {
  hadleClickAddButton: () => void;
  handleClickUpdateButton: () => void;
  handleClickDeleteButton: () => void;
}
const ControllButtonBox = ({
  hadleClickAddButton,
  handleClickUpdateButton,
  handleClickDeleteButton,
}: ControllButtonBoxProps) => {
  return (
    <Row style={{ width: "100%" }}>
      <ControllButton onClick={hadleClickAddButton}>
        <AddIcon width="16px" height="16px" />
        추가
      </ControllButton>
      <ControllButton onClick={handleClickUpdateButton}>
        <UpdateIcon width="16px" height="16px" />
        수정
      </ControllButton>
      <ControllButton onClick={handleClickDeleteButton}>
        <DeleteIcon width="16px" height="16px" />
        삭제
      </ControllButton>
    </Row>
  );
};
export default ControllButtonBox;
const ControllButton = styled(Row)`
  width: 33.3%;
  height: 40px;
  gap: 8px;
  border-right: 1px solid rgba(0, 0, 0, 0.05);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #e6e6e6;
  }
`;
