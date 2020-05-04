import { formatResults } from "../formatResults";

describe("format results", () => {
  it("highlights the correct indices", () => {
    expect(
      formatResults([
        {
          item: {
            title: "Old Man's War",
            author: {
              firstName: [{ text: "John", isHighlighted: true }],
              lastName: "Scalzi",
            },
          },
          matches: [
            {
              indices: [[0, 3]],
              value: "John",
              key: "author.firstName",
              arrayIndex: 0,
            },
          ],
        },
        {
          item: {
            title: "Monster 1959",
            author: { firstName: "David", lastName: "Maine" },
          },
          matches: [
            {
              indices: [[1, 2]],
              value: "Monster 1959",
              key: "title",
              arrayIndex: 0,
            },
          ],
        },
        {
          item: {
            title: "Colony",
            author: { firstName: "Rob", lastName: "Grant" },
          },
          matches: [
            {
              indices: [
                [1, 1],
                [3, 4],
              ],
              value: "Colony",
              key: "title",
              arrayIndex: 0,
            },
          ],
        },
      ])
    ).toEqual([
      {
        formatted: {
          author: {
            firstName: [{ isHighlighted: true, text: "John" }],
            lastName: "Scalzi",
          },
          title: "Old Man's War",
        },
        item: {
          author: {
            firstName: [{ isHighlighted: true, text: "John" }],
            lastName: "Scalzi",
          },
          title: "Old Man's War",
        },
        matches: [
          {
            arrayIndex: 0,
            indices: [[0, 3]],
            key: "author.firstName",
            value: "John",
          },
        ],
      },
      {
        formatted: {
          author: { firstName: "David", lastName: "Maine" },
          title: [
            { isHighlighted: false, text: "M" },
            { isHighlighted: true, text: "on" },
            { isHighlighted: false, text: "ster 1959" },
          ],
        },
        item: {
          author: { firstName: "David", lastName: "Maine" },
          title: "Monster 1959",
        },
        matches: [
          {
            arrayIndex: 0,
            indices: [[1, 2]],
            key: "title",
            value: "Monster 1959",
          },
        ],
      },
      {
        formatted: {
          author: { firstName: "Rob", lastName: "Grant" },
          title: [
            { isHighlighted: false, text: "C" },
            { isHighlighted: true, text: "o" },
            { isHighlighted: false, text: "l" },
            { isHighlighted: true, text: "on" },
            { isHighlighted: false, text: "y" },
          ],
        },
        item: {
          author: { firstName: "Rob", lastName: "Grant" },
          title: "Colony",
        },
        matches: [
          {
            arrayIndex: 0,
            indices: [
              [1, 1],
              [3, 4],
            ],
            key: "title",
            value: "Colony",
          },
        ],
      },
    ]);
  });
});
