import { Button } from "../../assets/style/content";
import usePortal from "../../hooks/usePortal";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setCurrentDir } from "../../store/slice/currentDirSlice";
import Item from "../Item";

const FileList = () => {
  const currentDir = useAppSelector((state) => state.currentDir.value);
  console.log("FileList", currentDir);
  const dispatch = useAppDispatch();
  const { Portal: AddFilePortal, setIsMount: setIsMountAddFile } = usePortal();
  const { Portal: DeleteFilePortal, setIsMount: setIsMountDeleteFile } = usePortal();
  const { Portal: UpdateFilePortal, setIsMount: setIsMountUpdateFile } = usePortal();
  return (
    <div>
      <Button onClick={() => setIsMountAddFile(true)}>추가</Button>
      <Button onClick={() => setIsMountUpdateFile(true)}>수정</Button>
      <Button isDelete onClick={() => setIsMountDeleteFile(true)}>
        삭제
      </Button>
      <Item isTitle />
      {currentDir.children?.map(
        (item) =>
          item.type === "FILE" && (
            <div
              key={item.name}
              onClick={() => dispatch(setCurrentDir({ ...currentDir, selectedFile: item.name }))}
            >
              <Item isActive={currentDir.selectedFile === item.name} item={item} />
            </div>
          )
      )}
    </div>
  );
};
export default FileList;
