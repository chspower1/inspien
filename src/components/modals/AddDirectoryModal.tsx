import { useForm } from "react-hook-form";
import { ModalWrapper, ConfirmButton, ClosingButton } from "../../assets/style/modal";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { File } from "../../store/Mockup";
import Input from "../Input";
import { setCurrentDir } from "../../store/slice/currentDirSlice";
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
    // if (children.find((item) => item.name === form.name))
    //   return alert("이름이 같은 파일 및 폴더는 생성할 수 없습니다!");
    // const directory: Directory = {
    //   name: form.name,
    //   type: "DIRECTORY",
    //   parent,
    //   children:
    // };
    // dispatch(addDirectory({ serverId, file, currentDir: name, currentParent: parent }));
    // dispatch(
    //   setCurrentDir({
    //     name,
    //     parent,
    //     selectedFile,
    //     children: [...children, file],
    //   })
    // );
    // setIsMountAddDirectory(false);
  };
  return (
    <ModalWrapper>
      {/* <form onSubmit={handleSubmit(onValid)}>
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
      <ClosingButton onClick={() => setIsMountAddDirectory(false)}>취소</ClosingButton> */}
    </ModalWrapper>
  );
};

export default AddDirectoryModal;
