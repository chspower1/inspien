import { ClosingButton, ConfirmButton, ModalWrapper } from "../../assets/style/modal";
import { removeItem } from "../../store/slice/dataSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  selectCurrentDir,
  selectCurrentFile,
  setCurrentDir,
} from "../../store/slice/currentInfoSlice";
interface DeleteDirectoryModalProps {
  serverId: number;
  setIsMountDeleteDirectory: React.Dispatch<React.SetStateAction<boolean>>;
}
const DeleteDirectoryModal = ({
  serverId,
  setIsMountDeleteDirectory,
}: DeleteDirectoryModalProps) => {
  const currentDir = useAppSelector(selectCurrentDir);
  const currentFile = useAppSelector(selectCurrentFile);
  const dispatch = useAppDispatch();

  const handleClickDeleteButton = () => {
    if (currentFile.name) {
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
          targetName: currentFile.name!,
        })
      );
      setIsMountDeleteDirectory(false);
    }
  };
  return (
    <ModalWrapper>
      <div>폴더 삭제</div>
      <div>정말 {currentFile.name}를 삭제하시겠습니까?</div>
      <ConfirmButton onClick={handleClickDeleteButton}>삭제</ConfirmButton>
      <ClosingButton onClick={() => setIsMountDeleteDirectory(false)}>취소</ClosingButton>
    </ModalWrapper>
  );
};
export default DeleteDirectoryModal;
