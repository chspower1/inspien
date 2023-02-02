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
import { addItem } from "../../store/slice/dataSlice";
import { Directory, File, ItemType } from "../../types/mockupData";
interface AddItemForm {
  name: string;
  size?: number;
}
interface AddItemModalProps {
  setIsMountAddItem: React.Dispatch<React.SetStateAction<boolean>>;
  type: ItemType;
}
const AddItemModal = ({ setIsMountAddItem, type }: AddItemModalProps) => {
  // redux state
  const serverId = useAppSelector(selectCurrentServerId);
  const currentDir = useAppSelector(selectCurrentDir);
  const currentFile = useAppSelector((state) => selectCurrentFile(state));
  const dispatch = useAppDispatch();

  // react-hook-form
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<AddItemForm>();

  // 추가 버튼 클릭 시
  const onValid = (form: AddItemForm) => {
    if (currentDir.children.find((item) => item.name === form.name))
      return alert("이름이 같은 파일은 생성할 수 없습니다!");
    const newItem: File | Directory =
      type === "FILE"
        ? {
            name: form.name,
            type,
            file_size: form.size!,
            modified_date: Date.now(),
          }
        : {
            name: form.name,
            type,
            children: [],
            parent: currentDir.parent,
          };
    dispatch(addItem({ serverId, newItem, currentDir }));
    dispatch(
      setCurrentDir({
        ...currentDir,
        children: [...currentDir.children, newItem],
      })
    );
    setIsMountAddItem(false);
  };
  return (
    <ModalWrapper>
      <form onSubmit={handleSubmit(onValid)}>
        {type === "FILE" ? (
          <>
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
          </>
        ) : (
          <Input
            label="폴더 이름"
            name="name"
            register={register("name", {
              required: "폴더 이름을 입력해주세요!",
            })}
            errorMessage={errors.name?.message || null}
          />
        )}

        <ConfirmButton>추가</ConfirmButton>
      </form>
      <ClosingButton onClick={() => setIsMountAddItem(false)}>취소</ClosingButton>
    </ModalWrapper>
  );
};

export default AddItemModal;
