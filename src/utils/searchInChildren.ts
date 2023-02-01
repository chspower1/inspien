import { Children, Directory } from "../store/Mockup";

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
