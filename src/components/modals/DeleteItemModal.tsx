import { Row } from "../../assets/style/common";
import {
  Accent,
  ButtonBox,
  ClosingButton,
  ConfirmButton,
  ModalTitle,
  ModalWrapper,
} from "../../assets/style/modal";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  selectCurrentDir,
  selectCurrentFile,
  selectCurrentServerId,
  setCurrentDir,
} from "../../store/slice/currentInfoSlice";
import { removeDirectory, removeFile } from "../../store/slice/dataSlice";
import { ItemType } from "../../types/mockupData";
interface DeleteItemModalProps {
  setIsMount: React.Dispatch<React.SetStateAction<boolean>>;
  type: ItemType;
}
const DeleteItemModal = ({ setIsMount, type }: DeleteItemModalProps) => {
  // redux
  const serverId = useAppSelector(selectCurrentServerId);
  const currentDir = useAppSelector(selectCurrentDir);
  const currentFile = useAppSelector(selectCurrentFile);
  const dispatch = useAppDispatch();

  // handler
  const handleClickDeleteButton = () => {
    if (type === "DIRECTORY") {
      // update currentDir
      dispatch(
        setCurrentDir({
          children: [],
          name: "",
          parent: undefined,
        })
      );
      // delete Item
      dispatch(
        removeDirectory({
          serverId,
          currentDir,
        })
      );
    } else if (type === "FILE") {
      // update currentDir
      dispatch(
        setCurrentDir({
          ...currentDir,
          children: currentDir.children.filter((item) => item.name !== currentFile.name),
        })
      );
      // delete Item
      dispatch(
        removeFile({
          serverId,
          currentDir,
          targetName: currentFile.name!,
        })
      );
    }

    setIsMount(false);
  };
  
  return (
    <ModalWrapper height="300px">
      <ModalTitle>{type === "DIRECTORY" ? "폴더" : "파일"} 삭제</ModalTitle>
      <Row>
        정말 <Accent>{type === "DIRECTORY" ? currentDir.name : currentFile.name}</Accent> 를
        삭제하시겠습니까?
      </Row>
      <ButtonBox>
        <ConfirmButton onClick={handleClickDeleteButton}>삭제</ConfirmButton>
        <ClosingButton onClick={() => setIsMount(false)}>취소</ClosingButton>
      </ButtonBox>
    </ModalWrapper>
  );
};
export default DeleteItemModal;
