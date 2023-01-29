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
}
const Modal = ({
  isShow,
  confirmComment = "확인",
  closingComment = "취소",
  onClose,
  activeFunction,
  title,
}: ModalProps) => {
  const ModalContent = (
    <>
      <ModalWrapper>
        <h2>{title}</h2>
        <div>
          <button onClick={activeFunction}>{confirmComment}</button>
          <button onClick={onClose}>{closingComment}</button>
        </div>
      </ModalWrapper>
      <Overlay />
    </>
  );
  return isShow
    ? createPortal(ModalContent, document.getElementById("modal-root") as HTMLElement)
    : null;
};

export default Modal;
const ModalWrapper = styled(Col)`
  z-index: 1000;
  position: absolute;
`;
const Overlay = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  background-color: rgba(0, 0, 0, 0.2);
`;
