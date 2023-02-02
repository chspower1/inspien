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
import AddFileModal from "../modals/AddFileModal";
import DeleteFileModal from "../modals/DeleteFileModal";

interface FileListProps {}
const FileList = () => {
  const serverId = useAppSelector((state) => selectCurrentServerId(state));
  const currentDir = useAppSelector((state) => selectCurrentDir(state));
  const currentFile = useAppSelector((state) => selectCurrentFile(state));
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
              onClick={() => dispatch(setCurrentFile({ name: item.name, parent: currentDir.name }))}
            >
              <Item isActive={currentFile.name === item.name} item={item} />
            </div>
          )
      )}
      <AddFilePortal>
        <AddFileModal serverId={serverId!} setIsMountAddFile={setIsMountAddFile} />
      </AddFilePortal>
      <DeleteFilePortal>
        <DeleteFileModal serverId={serverId!} setIsMountDeleteFile={setIsMountDeleteFile} />
      </DeleteFilePortal>
    </div>
  );
};
export default FileList;
