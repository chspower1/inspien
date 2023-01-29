import { createPortal } from "react-dom";
import styled from "styled-components";
import { Col } from "../assets/style/common";

interface ModalProps {
  isShow: boolean;
  confirmComment?: string;
  closingComment?: string;
  onClose: () => void;
  activeFunction: () => void;
  title: string;
  width?: string;
  height?: string;
}
const Modal = ({
  isShow,
  confirmComment = "확인",
  closingComment = "취소",
  onClose,
  activeFunction,
  title,
  width = "500px",
  height = "400px",
}: ModalProps) => {
  const ModalContent = (
    <>
      <ModalWrapper width={width} height={height}>
        <h2>{title}</h2>
        <div>
          <ConfirmButton onClick={activeFunction}>{confirmComment}</ConfirmButton>
          <ClosingButton onClick={onClose}>{closingComment}</ClosingButton>
        </div>
      </ModalWrapper>
      <Overlay onClick={onClose} />
    </>
  );
  return isShow
    ? createPortal(ModalContent, document.getElementById("modal-root") as HTMLElement)
    : null;
};

export default Modal;
const ModalWrapper = styled(Col)<{ width: string; height: string }>`
  z-index: 1000;
  position: absolute;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  background-color: white;
  right: 50%;
  top: 50%;
  transform: translate(50%, -50%);
`;
const Overlay = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  background-color: rgba(0, 0, 0, 0.2);
`;
const ConfirmButton = styled.button`
  width: 100px;
  height: 60px;
  background-color: #4472c4;
`;

const ClosingButton = styled(ConfirmButton)`
  background-color: #b73e47;
`;
