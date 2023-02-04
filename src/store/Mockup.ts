import { MockupDate } from "../types/mockupData";

export const MockupState: MockupDate = {
  directories: [
    {
      id: 1,
      serverName: "Server #1",
      directories: [
        {
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
                  name: "hosung",
                  type: "DIRECTORY",
                  parent: "/home",
                  children: [
                    {
                      name: "my",
                      type: "FILE",
                      file_size: 32819,
                      modified_date: 1674035700000,
                    },
                    {
                      name: "name",
                      type: "FILE",
                      file_size: 1234,
                      modified_date: 1674035700000,
                    },
                    {
                      name: "is",
                      type: "FILE",
                      file_size: 32523,
                      modified_date: 1674035700000,
                    },
                    {
                      name: "hosung",
                      type: "FILE",
                      file_size: 6435,
                      modified_date: 1674035700000,
                    },
                  ],
                },
                {
                  name: "haneul",
                  type: "DIRECTORY",
                  parent: "/home",
                  children: [
                    {
                      name: "index.html",
                      type: "FILE",
                      file_size: 32819,
                      modified_date: 1674035700000,
                    },
                    {
                      name: ".git",
                      type: "FILE",
                      file_size: 1234,
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
    {
      id: 2,
      serverName: "Server #2",
      directories: [
        {
          name: "/",
          type: "DIRECTORY",
          parent: undefined,
          children: [],
        },
      ],
    },
    {
      id: 3,
      serverName: "Server #3",
      directories: [
        {
          name: "/",
          type: "DIRECTORY",
          parent: undefined,
          children: [],
        },
      ],
    },
    {
      id: 4,
      serverName: "Server #4",
      directories: [
        {
          name: "/",
          type: "DIRECTORY",
          parent: undefined,
          children: [],
        },
      ],
    },
  ],
};
