import { Children } from "../mockupData";

export interface CurrentInfoState {
  value: {
    directory: CurrentDir;
    file: CurrentFile;
    server: CurrentServer;
  };
}
export interface CurrentDir {
  name: string;
  parent: string | undefined;
  children: Children;
}
export interface CurrentFile {
  name: undefined | string;
  parent: undefined | string;
}
export interface CurrentServer {
  id: number;
}
