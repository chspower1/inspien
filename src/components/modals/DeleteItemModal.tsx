import { AnimatePresence } from "framer-motion";
import { Row } from "../../assets/style/common";
import {
  Accent,
  ButtonBox,
  ClosingButton,
  ConfirmButton,
  ModalContainer,
  ModalTitle,
  ModalWrapper,
  Overlay,
} from "../../assets/style/modal";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  selectCurrentDir,
  selectCurrentFile,
  selectCurrentServerId,
  setCurrentDir,
} from "../../store/slice/currentInfoSlice";
import { removeDirectory, removeFile } from "../../store/slice/dataSlice";
import { ModalProps } from "../../types/modal";
import ReactDOM from "react-dom";

const DeleteItemModal = ({ isMount, setIsMount, type }: ModalProps) => {
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

  const ModalContent = (
    <AnimatePresence>
      {isMount && (
        <ModalWrapper>
          <Overlay onClick={() => setIsMount(false)} />
          <ModalContainer height="300px">
            <ModalTitle>{type === "DIRECTORY" ? "폴더" : "파일"} 삭제</ModalTitle>
            <Row>
              정말 <Accent>{type === "DIRECTORY" ? currentDir.name : currentFile.name}</Accent> 를
              삭제하시겠습니까?
            </Row>
            <ButtonBox>
              <ConfirmButton onClick={handleClickDeleteButton}>삭제</ConfirmButton>
              <ClosingButton onClick={() => setIsMount(false)}>취소</ClosingButton>
            </ButtonBox>
          </ModalContainer>
        </ModalWrapper>
      )}
    </AnimatePresence>
  );
  return ReactDOM.createPortal(ModalContent, document.getElementById("modal-root") as HTMLElement);
};
export default DeleteItemModal;
