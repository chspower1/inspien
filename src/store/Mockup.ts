export const MockupState = {
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
