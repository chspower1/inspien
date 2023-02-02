export interface MockupDate {
  directories: Server[];
}

export interface Server {
  id: number;
  serverName: string;
  directories: Directory;
}
export interface Directory {
  name: string;
  type: "DIRECTORY";
  parent: undefined | string;
  children: Children;
}
export interface File {
  name: string;
  type: "FILE";
  file_size: number;
  modified_date: number;
}
export type Children = (File | Directory)[];

export type ItemType = "FILE" | "DIRECTORY";
