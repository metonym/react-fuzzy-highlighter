import { shallow } from "enzyme";
import * as React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { Highlighter } from "../Highlighter";

describe("Highlighter", () => {
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
    const Mark: React.FC = ({children}) => (
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
    expect(wrapper.html()).toEqual("<span class=\"marked-text\">O</span>ld");
  });
});
