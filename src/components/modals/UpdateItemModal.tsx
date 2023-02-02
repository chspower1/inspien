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
import { Directory, File, Item, ItemType } from "../../types/mockupData";
import { updateItem } from "../../store/slice/dataSlice";
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
    if (currentDir.children.find((item) => item.name === form.name))
      return alert("동일한 경로에는 같은 이름을 가진 파일 및 폴더를 생성할 수 없습니다!");
    const newName = form.name;
    dispatch(updateItem({ serverId, targetName: currentFile.name!, newName, currentDir }));
    dispatch(
      setCurrentDir({
        ...currentDir,
        children: [
          ...currentDir.children.map((item) =>
            item.name === currentFile.name ? { ...item, name: newName } : item
          ),
        ],
      })
    );
    setIsMount(false);
  };
  return (
    <ModalWrapper>
      <form onSubmit={handleSubmit(onValid)}>
        <div>{type === "FILE" ? "파일 수정" : "폴더 수정"}</div>
        <div>현재 파일</div>
        <div>이름 : {currentFile.name}</div>
        <Input
          label={type === "FILE" ? "파일 이름" : "폴더 이름"}
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
