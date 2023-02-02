import { ClosingButton, ConfirmButton, ModalWrapper } from "../../assets/style/modal";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  selectCurrentDir,
  selectCurrentFile,
  selectCurrentServerId,
  setCurrentDir,
} from "../../store/slice/currentInfoSlice";
import { removeItem } from "../../store/slice/dataSlice";
interface DeleteItemModalProps {
  setIsMountDeleteFile: React.Dispatch<React.SetStateAction<boolean>>;
  type: "FILE" | "DIRECTORY";
}
const DeleteItemModal = ({ setIsMountDeleteFile }: DeleteItemModalProps) => {
  const serverId = useAppSelector(selectCurrentServerId);
  const currentDir = useAppSelector(selectCurrentDir);
  const currentFile = useAppSelector(selectCurrentFile);
  const dispatch = useAppDispatch();

  const handleClickDeleteButton = () => {
    dispatch(
      setCurrentDir({
        ...currentDir,
        children: currentDir.children.filter((item) => item.name !== currentFile.name),
      })
    );

    dispatch(
      removeItem({
        serverId,
        currentDir,
        targetName: currentDir.name,
      })
    );
    setIsMountDeleteFile(false);
  };
  return (
    <ModalWrapper>
      <div>정말 {currentDir.name}를 삭제하시겠습니까?</div>
      <ConfirmButton onClick={handleClickDeleteButton}>삭제</ConfirmButton>
      <ClosingButton onClick={() => setIsMountDeleteFile(false)}>취소</ClosingButton>
    </ModalWrapper>
  );
};
export default DeleteItemModal;
