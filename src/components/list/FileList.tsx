import { Button } from "../../assets/style/content";
import usePortal from "../../hooks/usePortal";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  selectCurrentDir,
  selectCurrentFile,
  selectCurrentServerId,
  setCurrentDir,
  setCurrentFile,
} from "../../store/slice/currentInfoSlice";
import Item from "../Item";
import AddItemModal from "../modals/AddItemModal";
import DeleteItemModal from "../modals/DeleteItemModal";

interface FileListProps {}
const FileList = () => {
  const currentDir = useAppSelector((state) => selectCurrentDir(state));
  const currentFile = useAppSelector((state) => selectCurrentFile(state));
  console.log("FileList", currentDir);
  const dispatch = useAppDispatch();
  const { Portal: AddFilePortal, setIsMount: setIsMountAddFile } = usePortal();
  const { Portal: DeleteFilePortal, setIsMount: setIsMountDeleteFile } = usePortal();
  const { Portal: UpdateFilePortal, setIsMount: setIsMountUpdateFile } = usePortal();

  const handleClickDeleteButton = () => {
    // 파일을 선택하지 않았을 때 예외처리
    if (currentFile.name === undefined) return alert("파일을 선택해 주세요!");
    setIsMountDeleteFile(true);
  };
  return (
    <div>
      <Button onClick={() => setIsMountAddFile(true)}>추가</Button>
      <Button onClick={() => setIsMountUpdateFile(true)}>수정</Button>
      <Button isDelete onClick={handleClickDeleteButton}>
        삭제
      </Button>
      <Item isTitle />
      {currentDir.children?.map(
        (item) =>
          item.type === "FILE" && (
            <div
              key={item.name}
              onClick={() => dispatch(setCurrentFile({ name: item.name, parent: currentDir.name }))}
            >
              <Item isActive={currentFile.name === item.name} item={item} />
            </div>
          )
      )}
      <AddFilePortal>
        <AddItemModal type="FILE" setIsMount={setIsMountAddFile} />
      </AddFilePortal>
      <DeleteFilePortal>
        <DeleteItemModal type="FILE" setIsMount={setIsMountDeleteFile} />
      </DeleteFilePortal>
    </div>
  );
};
export default FileList;
