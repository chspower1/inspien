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
interface DirectoryListProps {
  data: Server;
}
const DirectoryList = ({ data }: DirectoryListProps) => {
  const currentDir = useAppSelector((state) => state.currentDir);
  const dispatch = useAppDispatch();
  const { Portal: AddFolderPortal, setIsMount: setIsMountAddFolder } = usePortal();
  const { Portal: updateFolderPortal, setIsMount: setIsMountUpdateFolder } = usePortal();
  const { Portal: deleteFolderPortal, setIsMount: setIsMountDeleteFolder } = usePortal();

  const paintTree = (children: Children) => {
    return children.map((item) => {
      if (item.type === "DIRECTORY") {
        return (
          <TreeItemBox key={item.parent + item.name}>
            <DirectoryItem
              className={
                currentDir.name === item.name && currentDir.parent === item.parent
                  ? "active"
                  : "normal"
              }
              onClick={() =>
                dispatch(
                  setCurrentDir({
                    name: item.name,
                    parent: item.parent,
                    children: item.children,
                    selectedFile: null,
                  })
                )
              }
            >
              {checkDirInChildren(item.children) && <OpenOrCloseButton>+</OpenOrCloseButton>}
              <img src={DirectoryIcon} alt="Dic" />
              {item.name}
            </DirectoryItem>
            <TreeItemBox>{paintTree(item.children)}</TreeItemBox>
          </TreeItemBox>
        );
      } else return null;
    });
  };
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
        <DirectoryItem
          className={
            currentDir.name === "/" && currentDir.parent === undefined ? "active" : "normal"
          }
          onClick={() =>
            dispatch(
              setCurrentDir({
                name: "/",
                parent: undefined,
                children: data?.directories.children!,
                selectedFile: null,
              })
            )
          }
        >
          {checkDirInChildren(data?.directories.children!) && (
            <OpenOrCloseButton>+</OpenOrCloseButton>
          )}
          <img src={DirectoryIcon} alt="Dic" />/
        </DirectoryItem>
        <TreeItemBox>{paintTree(data?.directories.children!)}</TreeItemBox>
      </TreeItemBox>
    </Col>
  );
};
export default DirectoryList;
