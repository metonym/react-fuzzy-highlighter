import { mount } from "enzyme";
import Fuse from "fuse.js";
import * as React from "react";
import FuzzyHighlighter from "../FuzzyHighlighter";

let search: jest.SpyInstance<void, []>;

describe("FuzzyHighlighter", () => {
  afterEach(() => {
    jest.clearAllMocks();

    if (search !== undefined) {
      search.mockClear();
    }
  });

  it("instantiates without crashing", () => {
    const wrapper = mount<FuzzyHighlighter<{ t: string }, undefined>>(
      <FuzzyHighlighter<{ t: string }, undefined> query="" data={[{ t: "" }]} />
    );
    expect(wrapper).toBeTruthy();
    expect(wrapper.isEmptyRender()).toEqual(true);
  });

  test("search method is called", () => {
    search = jest.spyOn(FuzzyHighlighter.prototype, "search");
    expect(search).toHaveBeenCalledTimes(0);
    const wrapper = mount<FuzzyHighlighter<{ t: string }, undefined>>(
      <FuzzyHighlighter<{ t: string }, undefined> query="" data={[{ t: "" }]}>
        {({ results }) => JSON.stringify(results)}
      </FuzzyHighlighter>
    );

    expect(search).toHaveBeenCalledTimes(1);
    wrapper.setProps({ query: "data" });
    expect(search).toHaveBeenCalledTimes(2);
  });

  test("search has cache", () => {
    const wrapper = mount<FuzzyHighlighter<{ title: string }, undefined>>(
      <FuzzyHighlighter<{ title: string }, Fuse.IFuseOptions<{ title: string }>>
        query=""
        data={[
          { title: "Old Man's War" },
          { title: "The Lock Artist" },
          { title: "HTML5" },
        ]}
        options={{
          shouldSort: true,
          includeMatches: true,
          threshold: 0.6,
          location: 0,
          distance: 100,
          minMatchCharLength: 1,
          keys: ["title"],
        }}
      >
        {({ results }) => JSON.stringify(results)}
      </FuzzyHighlighter>
    );

    expect(wrapper.state().cache).toEqual({ "": [] });
    wrapper.setProps({ query: "old" });
    expect(wrapper.state().cache).toEqual({
      "": [],
      old: [
        {
          item: { title: "Old Man's War" },
          matches: [
            {
              indices: [[0, 2]],
              key: "title",
              value: "Old Man's War",
            },
          ],
          refIndex: 0,
        },
      ],
    });

    expect(wrapper.state().info.timing).toBeGreaterThan(0);
    wrapper.setProps({ query: "" });
    expect(wrapper.state().info.timing).toEqual(0);
  });

  test("search and clear cache if data changes", () => {
    search = jest.spyOn(FuzzyHighlighter.prototype, "search");

    const wrapper = mount<FuzzyHighlighter<{ title: string }, undefined>>(
      <FuzzyHighlighter<{ title: string }, Fuse.IFuseOptions<{ title: string }>>
        query=""
        data={[
          { title: "Old Man's War" },
          { title: "The Lock Artist" },
          { title: "HTML5" },
        ]}
        options={{
          shouldSort: true,
          includeMatches: true,
          threshold: 0.6,
          location: 0,
          distance: 100,
          minMatchCharLength: 1,
          keys: ["title"],
        }}
      >
        {({ results }) => JSON.stringify(results)}
      </FuzzyHighlighter>
    );

    expect(search).toHaveBeenCalledTimes(1);
    wrapper.setProps({ query: "old" });
    expect(search).toHaveBeenCalledTimes(2);
    expect(Object.keys(wrapper.state().cache).length).toEqual(2);
    wrapper.setProps({ data: [{ title: "War" }, { title: "Artist" }] });
    expect(search).toHaveBeenCalledTimes(3);
    expect(wrapper.state().results).toEqual([]);
    expect(Object.keys(wrapper.state().cache).length).toEqual(1);
    wrapper.setProps({ query: "artist" });
    expect(search).toHaveBeenCalledTimes(4);
    expect(wrapper.state().results).toEqual([
      {
        item: { title: "Artist" },
        matches: [{ indices: [[0, 5]], value: "Artist", key: "title" }],
        refIndex: 1,
      },
    ]);
    expect(Object.keys(wrapper.state().cache).length).toEqual(2);
  });
});
