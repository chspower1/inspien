import { useState } from "react";
import { DirectoryItem, OpenOrCloseButton, TreeItemBox } from "../assets/style/content";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { selectCurrentDir, setCurrentDir, setCurrentFile } from "../store/slice/currentInfoSlice";
import { checkDirInChildren } from "../utils/checkDirInChildren";
import DirectoryIcon from "../assets/img/directory_icon.png";
import { Children, Directory, File, Item } from "../types/mockupData";
const DirectoryTree = ({ children }: { children: Children }) => {
  const currentDir = useAppSelector((state) => selectCurrentDir(state));
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(true);
  const handleClickDirectory = (item: Directory) => {
    dispatch(
      setCurrentDir({
        name: item.name,
        parent: item.parent,
        children: item.children,
      })
    );
    dispatch(setCurrentFile({ name: undefined, parent: undefined }));
  };
  return (
    <>
      {children?.map(
        (item) =>
          item.type === "DIRECTORY" && (
            <TreeItemBox key={item.parent + item.name}>
              <DirectoryItem
                className={
                  currentDir.name === item.name && currentDir.parent === item.parent
                    ? "active"
                    : "normal"
                }
                onClick={() => handleClickDirectory(item)}
              >
                {checkDirInChildren(item.children) && (
                  <OpenOrCloseButton onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? "-" : "+"}
                  </OpenOrCloseButton>
                )}
                <img src={DirectoryIcon} alt="Dic" />
                {item.name}
              </DirectoryItem>
              <TreeItemBox>{isOpen && <DirectoryTree children={item.children} />}</TreeItemBox>
            </TreeItemBox>
          )
      )}
    </>
  );
};

export default DirectoryTree;
