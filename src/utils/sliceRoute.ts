interface SliceRouteProps {
  currentParent: string | undefined;
  currentDir: string;
}
export const sliceRoute = ({ currentParent, currentDir }: SliceRouteProps) => {
  const fullRoute =
    currentParent === undefined
      ? "/"
      : currentParent === "/"
      ? currentParent + currentDir
      : currentParent + "/" + currentDir;
  if (fullRoute === "/") return [fullRoute];
  else {
    const routeArr = fullRoute.split("/");
    routeArr.splice(0, 1, "/");
    return routeArr;
  }
};
