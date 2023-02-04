import { useForm } from "react-hook-form";
import { ModalWrapper, ConfirmButton, ClosingButton } from "../../assets/style/modal";
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
interface UpdateItemForm {
  name: string;
  size?: number;
}
interface UpdateItemModalProps {
  setIsMount: React.Dispatch<React.SetStateAction<boolean>>;
  type: ItemType;
}
const UpdateItemModal = ({ setIsMount, type }: UpdateItemModalProps) => {
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
    // 부모 폴더의 정보 조회
    const targetDirectory = changeTargetToParent(currentDir, serverData);
    // 같은이름일 경우 예외처리
    if (targetDirectory?.children.find((item) => item.type === type && item.name === form.name))
      return alert("같은 경로에 같이 이름의 폴더는 만들수 없습니다.");

    const newName = form.name;
    if (type === "FILE") {
      dispatch(updateItem({ serverId, targetName: currentFile.name!, newName, currentDir }));
      dispatch(
        setCurrentDir({
          ...currentDir,
          children: [
            ...currentDir.children.map((item) =>
              item.name === currentFile.name
                ? { ...item, name: newName, modified_date: Date.now() }
                : item
            ),
          ],
        })
      );
    } else if (type === "DIRECTORY") {
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
  return (
    <ModalWrapper>
      <form onSubmit={handleSubmit(onValid)}>
        <div>{type === "FILE" ? "파일" : "폴더"} 수정</div>
        <div>현재 {type === "FILE" ? "파일" : "폴더"}</div>
        <div>이름 : {type === "FILE" ? currentFile.name : currentDir.name}</div>
        <Input
          label={type === "FILE" ? "수정할 파일 이름" : "수정할 폴더 이름"}
          name="name"
          register={register("name", {
            required: type === "FILE" ? "파일 이름을 입력해주세요!" : "폴더 이름을 입력해주세요!",
          })}
          errorMessage={errors.name?.message || null}
        />
        <ConfirmButton>수정완료</ConfirmButton>
        <ClosingButton onClick={() => setIsMount(false)}>취소</ClosingButton>
      </form>
    </ModalWrapper>
  );
};

export default UpdateItemModal;
