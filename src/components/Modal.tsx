import { createPortal } from "react-dom";
import usePortal from "../hooks/usePortal";
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
  const Portal = usePortal();
  const ModalContent = (
    <div>
      <title>{title}</title>
      <div>
        <button onClick={activeFunction}>{confirmComment}</button>
        <button onClick={onClose}>{closingComment}</button>
      </div>
    </div>
  );
  return isShow ? Portal({ children: ModalContent }) : null;
};

export default Modal;
