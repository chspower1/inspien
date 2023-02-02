import { Col } from "../../assets/style/common";
import { Button, ButtonBox, TreeItemBox } from "../../assets/style/content";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import usePortal from "../../hooks/usePortal";
import { Server } from "../../store/Mockup";
import DirectoryTree from "../DirectoryTree";
import AddDirectoryModal from "../modals/AddDirectoryModal";
interface DirectoryListProps {
  data: Server;
  serverId: number;
}
const DirectoryList = ({ data, serverId }: DirectoryListProps) => {
  const currentDir = useAppSelector((state) => state.currentDir.value);
  const dispatch = useAppDispatch();
  const { Portal: AddFolderPortal, setIsMount: setIsMountAddFolder } = usePortal();
  const { Portal: UpdateFolderPortal, setIsMount: setIsMountUpdateFolder } = usePortal();
  const { Portal: DeleteFolderPortal, setIsMount: setIsMountDeleteFolder } = usePortal();

  return (
    <Col>
      <ButtonBox>
        <Button onClick={() => setIsMountAddFolder(true)}>추가</Button>
        <Button onClick={() => setIsMountUpdateFolder(true)}>수정</Button>
        <Button isDelete onClick={() => setIsMountDeleteFolder(true)}>
          삭제
        </Button>
      </ButtonBox>
      <TreeItemBox>
        <DirectoryTree children={data.directories.children} />
      </TreeItemBox>
      <AddFolderPortal>
        <AddDirectoryModal serverId={serverId} setIsMountAddDirectory={setIsMountAddFolder} />
      </AddFolderPortal>
      {/* <DeleteFolderPortal></DeleteFolderPortal> */}
    </Col>
  );
};
export default DirectoryList;
