import { ClosingButton, ConfirmButton, ModalWrapper } from "../../assets/style/modal";
import { removeFile } from "../../store/slice/dataSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setCurrentDir } from "../../store/slice/currentDirSlice";
interface DeleteFileModalProps {
  serverId: number;
  setIsMountDeleteFile: React.Dispatch<React.SetStateAction<boolean>>;
}
const DeleteFileModal = ({ serverId, setIsMountDeleteFile }: DeleteFileModalProps) => {
  const { name, children, parent, selectedFile } = useAppSelector(
    (state) => state.currentDir.value
  );
  const dispatch = useAppDispatch();

  const handleClickDeleteButton = () => {
    dispatch(
      setCurrentDir({
        name,
        parent,
        selectedFile,
        children: children.filter((item) => item.name !== selectedFile),
      })
    );

    dispatch(
      removeFile({
        serverId,
        fileName: selectedFile!,
        currentDir: name,
        currentParent: parent,
      })
    );
    setIsMountDeleteFile(false);
  };
  return (
    <ModalWrapper>
      <div>정말 {selectedFile}를 삭제하시겠습니까?</div>
      <ConfirmButton onClick={handleClickDeleteButton}>삭제</ConfirmButton>
      <ClosingButton onClick={() => setIsMountDeleteFile(false)}>취소</ClosingButton>
    </ModalWrapper>
  );
};
export default DeleteFileModal;
