import { useForm } from "react-hook-form";
import { ModalWrapper, ConfirmButton, ClosingButton } from "../../assets/style/modal";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Directory, File } from "../../store/Mockup";
import Input from "../Input";
import { selectCurrentDir, setCurrentDir } from "../../store/slice/currentInfoSlice";
import { addItem } from "../../store/slice/dataSlice";
interface AddDirectoryForm {
  name: string;
}
interface AddDirectoryModalProps {
  serverId: number;
  setIsMountAddDirectory: React.Dispatch<React.SetStateAction<boolean>>;
}
const AddDirectoryModal = ({ serverId, setIsMountAddDirectory }: AddDirectoryModalProps) => {
  const currentDir = useAppSelector(selectCurrentDir);
  const currentFile = useAppSelector((state) => state.currentInfo.value.file);
  const dispatch = useAppDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<AddDirectoryForm>();

  // 추가 버튼 클릭 시
  const onValid = (form: AddDirectoryForm) => {
    if (currentDir.children.find((item) => item.name === form.name))
      return alert("이름이 같은 파일 및 폴더는 생성할 수 없습니다!");
    const newItem: Directory = {
      name: form.name,
      children: [],
      parent: currentDir.parent,
      type: "DIRECTORY",
    };
    dispatch(
      addItem({
        serverId,
        currentDir,
        newItem,
      })
    );
    dispatch(
      setCurrentDir({
        ...currentDir,
        children: [...currentDir.children, newItem],
      })
    );
    setIsMountAddDirectory(false);
  };
  return (
    <ModalWrapper>
      <form onSubmit={handleSubmit(onValid)}>
        <Input
          label="폴더 이름"
          name="name"
          register={register("name", {
            required: "폴더 이름을 입력해주세요!",
          })}
          errorMessage={errors.name?.message || null}
        />
        <ConfirmButton>추가</ConfirmButton>
      </form>
      <ClosingButton onClick={() => setIsMountAddDirectory(false)}>취소</ClosingButton>
    </ModalWrapper>
  );
};

export default AddDirectoryModal;
