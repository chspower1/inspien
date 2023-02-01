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

export const MockupState: MockupDate = {
  directories: [
    {
      id: 1,
      serverName: "Server #1",
      directories: {
        name: "/",
        type: "DIRECTORY",
        parent: undefined,
        children: [
          {
            name: "home",
            type: "DIRECTORY",
            parent: "/",
            children: [
              {
                name: ".bash_history",
                type: "FILE",
                file_size: 32819,
                modified_date: 1674035700000,
              },
              {
                name: "home2",
                type: "DIRECTORY",
                parent: "/home",
                children: [
                  {
                    name: ".asd",
                    type: "FILE",
                    file_size: 32819,
                    modified_date: 1674035700000,
                  },
                  {
                    name: "home",
                    type: "DIRECTORY",
                    parent: "/home/home2",
                    children: [
                      {
                        name: ".bash_history",
                        type: "FILE",
                        file_size: 32819,
                        modified_date: 1674035700000,
                      },
                      {
                        name: "home2",
                        type: "DIRECTORY",
                        parent: "/home/home2/home",
                        children: [
                          {
                            name: ".asd",
                            type: "FILE",
                            file_size: 32819,
                            modified_date: 1674035700000,
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    },
    {
      id: 2,
      serverName: "Server #2",
      directories: {
        name: "/",
        type: "DIRECTORY",
        parent: undefined,
        children: [],
      },
    },
    {
      id: 3,
      serverName: "Server #3",
      directories: {
        name: "/",
        type: "DIRECTORY",
        parent: undefined,
        children: [],
      },
    },
    {
      id: 4,
      serverName: "Server #4",
      directories: {
        name: "/",
        type: "DIRECTORY",
        parent: undefined,
        children: [],
      },
    },
  ],
};
