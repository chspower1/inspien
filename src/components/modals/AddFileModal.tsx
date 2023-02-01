import { useForm } from "react-hook-form";
import { ModalWrapper, ConfirmButton, ClosingButton } from "../../assets/style/modal";

import { addFile } from "../../store/slice/dataSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { File } from "../../store/Mockup";
import Input from "../Input";
import { setCurrentDir } from "../../store/slice/currentDirSlice";
interface AddFileForm {
  name: string;
  size: number;
}
interface AddFileModalProps {
  serverId: number;
  setIsMountAddFile: React.Dispatch<React.SetStateAction<boolean>>;
}
const AddFileModal = ({ serverId, setIsMountAddFile }: AddFileModalProps) => {
  const { name, children, parent, selectedFile } = useAppSelector(
    (state) => state.currentDir.value
  );
  const dispatch = useAppDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<AddFileForm>();

  // 추가 버튼 클릭 시
  const onValid = (form: AddFileForm) => {
    console.log(children.filter((item) => item.name === form.name));
    if (children.find((item) => item.name === form.name))
      return alert("이름이 같은 파일은 생성할 수 없습니다!");
    const file: File = {
      name: form.name,
      type: "FILE",
      file_size: form.size,
      modified_date: Date.now(),
    };
    dispatch(addFile({ serverId, file, currentDir: name, currentParent: parent }));
    dispatch(
      setCurrentDir({
        name,
        parent,
        selectedFile,
        children: [...children, file],
      })
    );
  };
  return (
    <ModalWrapper>
      <form onSubmit={handleSubmit(onValid)}>
        <Input
          label="파일 이름"
          name="name"
          register={register("name", {
            required: "파일 이름을 입력해주세요!",
          })}
          errorMessage={errors.name?.message || null}
        />
        <Input
          label="파일 크기"
          name="size"
          type="number"
          register={register("size", {
            required: "파일 사이즈를 입력해주세요!",
          })}
          errorMessage={errors.size?.message || null}
        />
        <ConfirmButton>추가</ConfirmButton>
      </form>
      <ClosingButton onClick={() => setIsMountAddFile(false)}>취소</ClosingButton>
    </ModalWrapper>
  );
};

export default AddFileModal;
