import { beforeAll, describe, it, test, expect } from "vitest";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import * as React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { Highlighter } from "../src";

describe("Highlighter", () => {
  beforeAll(() => {
    configure({ adapter: new Adapter() });
  });

  it("renders without crashing", () => {
    const div = document.createElement("div");
    render(<Highlighter text="" />, div);
    unmountComponentAtNode(div);
  });

  test("prop `text` as an array", () => {
    const wrapper = shallow(
      <Highlighter
        text={[
          { text: "O", isHighlighted: true },
          { text: "ld", isHighlighted: false },
        ]}
      />
    );
    expect(wrapper.html()).toEqual("<mark>O</mark>ld");
  });

  test("prop `text` as a string", () => {
    const wrapper = shallow(<Highlighter text={"Old"} />);
    expect(wrapper.html()).toEqual("Old");
  });

  test("prop `mark` as a custom component", () => {
    const Mark: React.FC = ({ children }) => (
      <span className="marked-text">{children}</span>
    );
    const wrapper = shallow(
      <Highlighter
        text={[
          { text: "O", isHighlighted: true },
          { text: "ld", isHighlighted: false },
        ]}
        mark={Mark}
      />
    );
    expect(wrapper.html()).toEqual('<span class="marked-text">O</span>ld');
  });
});
