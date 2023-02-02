import { Col } from "../../assets/style/common";
import { Button, ButtonBox, TreeItemBox } from "../../assets/style/content";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import usePortal from "../../hooks/usePortal";
import DirectoryTree from "../DirectoryTree";
import { selectServerData } from "../../store/slice/dataSlice";
import { selectCurrentDir } from "../../store/slice/currentInfoSlice";
import AddItemModal from "../modals/AddItemModal";
import DeleteItemModal from "../modals/DeleteItemModal";
interface DirectoryListProps {}
const DirectoryList = () => {
  // redux state
  const currentData = useAppSelector(selectServerData);
  const currentDir = useAppSelector(selectCurrentDir);
  const dispatch = useAppDispatch();

  // modal
  const { Portal: AddDirectoryPortal, setIsMount: setIsMountAddDirectory } = usePortal();
  const { Portal: UpdateDirectoryPortal, setIsMount: setIsMountUpdateDirectory } = usePortal();
  const { Portal: DeleteDirectoryPortal, setIsMount: setIsMountDeleteDirectory } = usePortal();

  const handleClickDeleteButton = () => {
    // 예외처리
    if (currentDir.parent === undefined) return alert("최상위 폴더는 삭제할 수 없습니다.");
    if (currentDir.children.length > 0)
      return alert("하위에 폴더나 파일이 있으면 삭제할 수 없습니다!");
    setIsMountDeleteDirectory(true);
  };
  return (
    <Col>
      <ButtonBox>
        <Button onClick={() => setIsMountAddDirectory(true)}>추가</Button>
        <Button onClick={() => setIsMountUpdateDirectory(true)}>수정</Button>
        <Button isDelete onClick={handleClickDeleteButton}>
          삭제
        </Button>
      </ButtonBox>
      <TreeItemBox>
        <DirectoryTree children={currentData.directories} />
      </TreeItemBox>
      <AddDirectoryPortal>
        <AddItemModal type="DIRECTORY" setIsMount={setIsMountAddDirectory} />
      </AddDirectoryPortal>
      <DeleteDirectoryPortal>
        <DeleteItemModal type="DIRECTORY" setIsMount={setIsMountDeleteDirectory} />
      </DeleteDirectoryPortal>
    </Col>
  );
};
export default DirectoryList;
