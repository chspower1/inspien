import { ClosingButton, ConfirmButton, ModalWrapper } from "../../assets/style/modal";

const DeleteFileModal = () => {
  return (
    <ModalWrapper>
      <ConfirmButton>삭제</ConfirmButton>
      <ClosingButton>취소</ClosingButton>
    </ModalWrapper>
  );
};
export default DeleteFileModal;
