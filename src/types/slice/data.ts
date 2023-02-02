import { Directory, File } from "../mockupData";
import { CurrentDir } from "./currentInfo";

export interface Response {
  serverId: number;
  currentDir: CurrentDir;
}
export interface AddResponse extends Response {
  newItem: Directory | File;
}
export interface DeleteResponse extends Response {
  targetName: string;
}
export interface UpdateResponse extends DeleteResponse {
  targetName: string;
  newName: string;
}
