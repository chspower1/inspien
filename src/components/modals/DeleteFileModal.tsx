import { ClosingButton, ConfirmButton, ModalWrapper } from "../../assets/style/modal";
import { CurrentDirInfo } from "../../pages/Detail";
import { removeFile } from "../../store/dataSlice";
import { useAppDispatch } from "../../store/hooks";
interface DeleteFileModalProps {
  serverId: number;
  currentDirInfo: CurrentDirInfo;
  setIsMountDeleteFile: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentDirInfo: React.Dispatch<React.SetStateAction<CurrentDirInfo>>;
}
const DeleteFileModal = ({
  serverId,
  currentDirInfo,
  setIsMountDeleteFile,
  setCurrentDirInfo,
}: DeleteFileModalProps) => {
  const { name, children, parent, selectedFile } = currentDirInfo;
  const dispatch = useAppDispatch();

  const handleClickDeleteButton = () => {
    setCurrentDirInfo({
      ...currentDirInfo,
      children: currentDirInfo.children.filter((item) => item.name !== currentDirInfo.selectedFile),
    });
    dispatch(
      removeFile({
        serverId,
        fileName: selectedFile!,
        currentDir: name,
        currentParent: parent,
      })
    );
  };
  return (
    <ModalWrapper>
      <div>정말 {currentDirInfo.selectedFile}를 삭제하시겠습니까?</div>
      <ConfirmButton onClick={handleClickDeleteButton}>삭제</ConfirmButton>
      <ClosingButton onClick={() => setIsMountDeleteFile(false)}>취소</ClosingButton>
    </ModalWrapper>
  );
};
export default DeleteFileModal;
