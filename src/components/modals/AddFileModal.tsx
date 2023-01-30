import { useForm } from "react-hook-form";
import { ModalWrapper, ConfirmButton, ClosingButton } from "../../assets/style/modal";
import { addFile } from "../../store/dataSlice";
import { useAppDispatch } from "../../store/hooks";
import { File } from "../../store/Mockup";
import Input from "../Input";
interface AddFileForm {
  name: string;
  size: number;
}
interface AddFileModalProps {
  serverId: number;
  currentDir: string;
  currentParent: string | undefined;
  setIsMountAddFile: React.Dispatch<React.SetStateAction<boolean>>;
}
const AddFileModal = ({
  serverId,
  currentDir,
  currentParent,
  setIsMountAddFile,
}: AddFileModalProps) => {
  const dispatch = useAppDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<AddFileForm>();
  const onValid = (form: AddFileForm) => {
    const file: File = {
      name: form.name,
      type: "FILE",
      file_size: form.size,
      modified_date: Date.now(),
    };
    dispatch(addFile({ serverId, file, currentDir, currentParent }));
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
