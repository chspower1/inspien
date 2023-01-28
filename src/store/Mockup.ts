interface MockupDate {
  directories: Server[];
}

interface Server {
  id: number;
  serverName: string;
  directories: Directory;
}
interface Directory {
  name: string;
  type: "DIRECTORY";
  parent: undefined | string;
  children: (File | Directory)[] | [];
}
interface File {
  name: string;
  type: "FILE";
  file_size: number;
  modified_date: number;
}

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
            ],
          },
        ],
      },
    },
    {
      id: 1,
      serverName: "Server #2",
      directories: {
        name: "/",
        type: "DIRECTORY",
        parent: undefined,
        children: [],
      },
    },
    {
      id: 1,
      serverName: "Server #3",
      directories: {
        name: "/",
        type: "DIRECTORY",
        parent: undefined,
        children: [],
      },
    },
    {
      id: 1,
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
