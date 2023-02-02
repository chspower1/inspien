import { ClosingButton, ConfirmButton, ModalWrapper } from "../../assets/style/modal";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  selectCurrentDir,
  selectCurrentFile,
  selectCurrentServerId,
  setCurrentDir,
} from "../../store/slice/currentInfoSlice";
import { removeItem } from "../../store/slice/dataSlice";
import { ItemType } from "../../types/mockupData";
interface DeleteItemModalProps {
  setIsMount: React.Dispatch<React.SetStateAction<boolean>>;
  type: ItemType;
}
const DeleteItemModal = ({ setIsMount, type }: DeleteItemModalProps) => {
  const serverId = useAppSelector(selectCurrentServerId);
  const currentDir = useAppSelector(selectCurrentDir);
  const currentFile = useAppSelector(selectCurrentFile);
  const dispatch = useAppDispatch();

  const handleClickDeleteButton = () => {
    if (type === "DIRECTORY") {
      // 하위경로에 파일or폴더 있을경우 예외처리
      if (currentDir.children.length > 0)
        return alert("하위에 폴더나 파일이 있으면 삭제할 수 없습니다!");

      // delete Item
      dispatch(
        removeItem({
          serverId,
          currentDir,
          targetName: currentDir.name,
        })
      );
    } else if (type === "FILE") {
      // 최상위 폴더 예외처리
      if (currentFile.name === undefined) return alert("최상위 폴더는 삭제할 수 없습니다.");
      // update currentDir
      dispatch(
        setCurrentDir({
          ...currentDir,
          children: currentDir.children.filter((item) => item.name !== currentFile.name),
        })
      );
      // delete Item
      dispatch(
        removeItem({
          serverId,
          currentDir,
          targetName: currentFile.name!,
        })
      );
    }

    setIsMount(false);
  };
  return (
    <ModalWrapper>
      <div>정말 {currentDir.name}를 삭제하시겠습니까?</div>
      <ConfirmButton onClick={handleClickDeleteButton}>삭제</ConfirmButton>
      <ClosingButton onClick={() => setIsMount(false)}>취소</ClosingButton>
    </ModalWrapper>
  );
};
export default DeleteItemModal;
