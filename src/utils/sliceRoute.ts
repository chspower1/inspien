export const sliceRoute = (fullRoute: string) => {
  if (fullRoute === "/") return [fullRoute];
  else {
    const routeArr = fullRoute.split("/");
    routeArr.splice(0, 1, "/");
    return routeArr;
  }
};
