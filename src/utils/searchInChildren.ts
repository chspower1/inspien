import { Children, Directory } from "../types/mockupData";
/**
 * 자식 배열 중 대상 Directory가 있는지 판단하는 재귀함수
 * @params Children 찾을 하위 자식들
 * @params string name 찾을 대상의 이름
 * @params string parent 찾을 대상의 부모
 */
export const searchInChildren = (
  children: Children,
  name: string,
  parent: string | undefined
): Directory | undefined => {
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    if (child.type === "DIRECTORY") {
      if (child.name === name && child.parent === parent) {
        return child;
      }
      const searchResult = searchInChildren(child.children, name, parent);
      if (searchResult) {
        return searchResult;
      }
    }
  }
  return undefined;
};
