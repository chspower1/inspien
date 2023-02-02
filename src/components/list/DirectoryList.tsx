import { Col } from "../../assets/style/common";
import { Button, ButtonBox, TreeItemBox } from "../../assets/style/content";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import usePortal from "../../hooks/usePortal";
import DirectoryTree from "../DirectoryTree";
import { selectServerData } from "../../store/slice/dataSlice";
import { selectCurrentDir } from "../../store/slice/currentInfoSlice";
import AddItemModal from "../modals/AddItemModal";
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

  return (
    <Col>
      <ButtonBox>
        <Button onClick={() => setIsMountAddDirectory(true)}>추가</Button>
        <Button onClick={() => setIsMountUpdateDirectory(true)}>수정</Button>
        <Button isDelete onClick={() => setIsMountDeleteDirectory(true)}>
          삭제
        </Button>
      </ButtonBox>
      <TreeItemBox>
        <DirectoryTree children={currentData.directories} />
      </TreeItemBox>
      <AddDirectoryPortal>
        <AddItemModal type="DIRECTORY" setIsMountAddItem={setIsMountAddDirectory} />
      </AddDirectoryPortal>
      {/* <DeleteFolderPortal></DeleteFolderPortal> */}
    </Col>
  );
};
export default DirectoryList;
