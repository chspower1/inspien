import { useForm } from "react-hook-form";
import {
  ModalWrapper,
  ConfirmButton,
  ClosingButton,
  ModalTitle,
  ButtonBox,
  Overlay,
  ModalContainer,
} from "../../assets/style/modal";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import Input from "../Input";
import {
  selectCurrentDir,
  selectCurrentFile,
  selectCurrentServerId,
  setCurrentDir,
} from "../../store/slice/currentInfoSlice";
import type { ItemType } from "../../types/mockupData";
import { selectServerData, updateDirectory, updateItem } from "../../store/slice/dataSlice";
import { changeTargetToParent } from "../../utils/changeTargetToParent";
import { ModalProps } from "../../types/modal";
import { AnimatePresence } from "framer-motion";
import ReactDOM from "react-dom";
interface UpdateItemForm {
  name: string;
  size?: number;
}
const UpdateItemModal = ({ isMount, setIsMount, type }: ModalProps) => {

  const targetType = type === "DIRECTORY" ? "폴더" : "파일";
  // redux state
  const serverId = useAppSelector(selectCurrentServerId);
  const serverData = useAppSelector(selectServerData);
  const currentDir = useAppSelector(selectCurrentDir);
  const currentFile = useAppSelector(selectCurrentFile);
  const dispatch = useAppDispatch();

  // react-hook-form
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<UpdateItemForm>();

  // 수정 버튼 클릭 시
  const onValid = (form: UpdateItemForm) => {
    const newName = form.name;
    if (type === "FILE") {
      // 같은 이름일 경우 예외처리
      if (currentDir?.children.find((item) => item.type === type && item.name === form.name))
        return alert("같은 경로에 이미 같은 이름의 파일이 존재합니다!");
      // update
      const currentTime = Date.now();
      dispatch(
        updateItem({ serverId, targetName: currentFile.name!, newName, currentDir, currentTime })
      );
      dispatch(
        setCurrentDir({
          ...currentDir,
          children: [
            ...currentDir.children.map((item) =>
              item.name === currentFile.name
                ? { ...item, name: newName, modified_date: currentTime }
                : item
            ),
          ],
        })
      );
    } else if (type === "DIRECTORY") {
      // 부모 폴더의 정보 조회
      const targetDirectory = changeTargetToParent(currentDir, serverData);
      // 같은이름일 경우 예외처리
      if (targetDirectory?.children.find((item) => item.type === type && item.name === form.name))
        return alert("같은 경로에 같이 이름의 폴더는 만들수 없습니다.");
      // update
      dispatch(
        updateDirectory({
          serverId,
          currentDir,
          newName,
          targetName: "",
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
          <ModalContainer>
            <ModalTitle>{targetType} 수정</ModalTitle>
            <form onSubmit={handleSubmit(onValid)}>
              <div style={{ marginBottom: "20px" }}>
                현재 {targetType} 이름 : {type === "FILE" ? currentFile.name : currentDir.name}
              </div>

              <Input
                label="수정할 이름"
                name="name"
                register={register("name", {
                  required:
                    type === "FILE" ? "파일 이름을 입력해주세요!" : "폴더 이름을 입력해주세요!",
                })}
                errorMessage={errors.name?.message || null}
              />
              <ButtonBox>
                <ConfirmButton>수정완료</ConfirmButton>
                <ClosingButton type="button" onClick={() => setIsMount(false)}>
                  취소
                </ClosingButton>
              </ButtonBox>
            </form>
          </ModalContainer>
        </ModalWrapper>
      )}
    </AnimatePresence>
  );
  return ReactDOM.createPortal(ModalContent, document.getElementById("modal-root") as HTMLElement);
};

export default UpdateItemModal;
