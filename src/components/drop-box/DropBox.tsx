import styled from "styled-components";
import { Col } from "../../assets/style/common";

const DropBox = () => {
  return (
    <Wrapper>
      <div>파일 생성</div>
      <div>파일 수정</div>
      <div>파일 삭제</div>
      <button>취소</button>
    </Wrapper>
  );
};
export default DropBox;
const Wrapper = styled(Col)`
  justify-content: flex-start;
  width: 200px;
  height: 200px;
  background-color: ${({ theme }) => theme.gray};
`;
