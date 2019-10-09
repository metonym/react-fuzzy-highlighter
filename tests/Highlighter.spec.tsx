import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import * as React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { Highlighter } from '../src/Highlighter';

describe('Highlighter', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    render(<Highlighter text="" />, div);
    unmountComponentAtNode(div);
  });

  test('prop `text` as an array', () => {
    const wrapper = shallow(
      <Highlighter
        text={[
          { text: 'O', isHighlighted: true },
          { text: 'ld', isHighlighted: false }
        ]}
      />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  test('prop `text` as a string', () => {
    const wrapper = shallow(<Highlighter text={'Old'} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
