import { Children } from "../types/mockupData";
/**
 * children중에 디렉토리가 있는지 검사하는 함수.
 * @param children
 * @returns 디렉토리가 있으며 true, 없으면 false값 반환
 */
export const checkDirInChildren = (children: Children) => {
  console.log(children.filter((item) => item.type === "DIRECTORY"));
  if (children.filter((item) => item.type === "DIRECTORY").length !== 0) return true;
  else return false;
};
