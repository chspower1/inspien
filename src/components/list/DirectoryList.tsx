import { Col } from "../../assets/style/common";
import {
  Button,
  ButtonBox,
  DirectoryItem,
  OpenOrCloseButton,
  TreeItemBox,
} from "../../assets/style/content";
import { setCurrentDir } from "../../store/slice/currentDirSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import usePortal from "../../hooks/usePortal";
import { checkDirInChildren } from "../../utils/checkDirInChildren";
import { Children, Server } from "../../store/Mockup";
import DirectoryIcon from "../../assets/img/directory_icon.png";
import DirectoryTree from "../DirectoryTree";
interface DirectoryListProps {
  data: Server;
}
const DirectoryList = ({ data }: DirectoryListProps) => {
  const currentDir = useAppSelector((state) => state.currentDir.value);
  const dispatch = useAppDispatch();
  const { Portal: AddFolderPortal, setIsMount: setIsMountAddFolder } = usePortal();
  const { Portal: updateFolderPortal, setIsMount: setIsMountUpdateFolder } = usePortal();
  const { Portal: deleteFolderPortal, setIsMount: setIsMountDeleteFolder } = usePortal();

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
    </Col>
  );
};
export default DirectoryList;
