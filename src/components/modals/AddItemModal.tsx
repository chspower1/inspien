import { useForm } from "react-hook-form";
import {
  ModalWrapper,
  ConfirmButton,
  ClosingButton,
  ModalTitle,
  ButtonBox,
} from "../../assets/style/modal";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import Input from "../Input";
import {
  selectCurrentDir,
  selectCurrentFile,
  selectCurrentServerId,
  setCurrentDir,
} from "../../store/slice/currentInfoSlice";
import { addItem } from "../../store/slice/dataSlice";
import { Directory, File, Item, ItemType } from "../../types/mockupData";
interface AddItemForm {
  name: string;
  size?: number;
}
interface AddItemModalProps {
  setIsMount: React.Dispatch<React.SetStateAction<boolean>>;
  type: ItemType;
}
const AddItemModal = ({ setIsMount, type }: AddItemModalProps) => {
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
    if (currentDir.children.find((item) => item.type === type && item.name === form.name))
      return alert("동일한 경로에는 같은 이름을 가진 파일 및 폴더를 생성할 수 없습니다!");
    const parent =
      currentDir.parent === undefined ? currentDir.name : currentDir.parent + "/" + currentDir.name;
    const newItem: Item =
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
            parent,
          };
    dispatch(addItem({ serverId, newItem, currentDir }));
    dispatch(
      setCurrentDir({
        ...currentDir,
        children: [...currentDir.children, newItem],
      })
    );
    setIsMount(false);
  };
  return (
    <ModalWrapper>
      <ModalTitle>{type === "FILE" ? "파일" : "폴더"} 추가</ModalTitle>
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
        <ButtonBox>
          <ConfirmButton>추가</ConfirmButton>
          <ClosingButton type="button" onClick={() => setIsMount(false)}>
            취소
          </ClosingButton>
        </ButtonBox>
      </form>
    </ModalWrapper>
  );
};

export default AddItemModal;
