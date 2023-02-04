import { Server } from "../types/mockupData";
import { CurrentDir } from "../types/slice/currentInfo";
import { searchInChildren } from "./searchInChildren";
/**
 * 검색할 타겟을 부모로 변경하기위해 부모의 데이터를 찾는 함수.
 * @param currentDir 현재 디렉토리의 정보
 * @param serverData 현재 서버데이터
 * @returns 현재 디렉토리의 부모 디렉토리
 */
export const changeTargetToParent = (currentDir: CurrentDir, serverData: Server) => {
  // 선택된 상위폴더로 타겟 변경
  const newTarget = currentDir.parent?.split("/").pop();
  const parentArr = currentDir.parent?.split("/").slice(1, -1);
  let parent = "";
  if (parentArr?.length === 0) {
    parent = "/";
  } else {
    currentDir.parent
      ?.split("/")
      .slice(1, -1)
      .forEach((i) => (parent = parent + "/" + i));
  }
  // depth가 2이하일 경우 전체 데이터로 조회
  const targetDirectory = newTarget
    ? searchInChildren(serverData.directories, newTarget!, parent)
    : serverData.directories[0];

  return targetDirectory;
};
