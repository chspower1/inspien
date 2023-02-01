import { Children } from "../store/Mockup";

export const checkDirInChildren = (children: Children) => {
  console.log(children.filter((item) => item.type === "DIRECTORY"));
  if (children.filter((item) => item.type === "DIRECTORY").length !== 0) return true;
  else return false;
};
