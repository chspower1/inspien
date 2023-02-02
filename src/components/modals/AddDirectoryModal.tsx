import { useForm } from "react-hook-form";
import { ModalWrapper, ConfirmButton, ClosingButton } from "../../assets/style/modal";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Directory, File } from "../../store/Mockup";
import Input from "../Input";
import { setCurrentDir } from "../../store/slice/currentDirSlice";
import { addDirectory } from "../../store/slice/dataSlice";
interface AddDirectoryForm {
  name: string;
}
interface AddDirectoryModalProps {
  serverId: number;
  setIsMountAddDirectory: React.Dispatch<React.SetStateAction<boolean>>;
}
const AddDirectoryModal = ({ serverId, setIsMountAddDirectory }: AddDirectoryModalProps) => {
  const { name, children, parent, selectedFile } = useAppSelector(
    (state) => state.currentDir.value
  );
  const dispatch = useAppDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<AddDirectoryForm>();

  // 추가 버튼 클릭 시
  const onValid = (form: AddDirectoryForm) => {
    if (children.find((item) => item.name === form.name))
      return alert("이름이 같은 파일 및 폴더는 생성할 수 없습니다!");
    const newDir: Directory = {
      name: form.name,
      children: [],
      parent,
      type: "DIRECTORY",
    };
    dispatch(
      addDirectory({
        serverId,
        currentDir: name,
        currentParent: parent,
        children,
        newDir,
      })
    );
    dispatch(
      setCurrentDir({
        name,
        parent,
        selectedFile,
        children: [...children, newDir],
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
