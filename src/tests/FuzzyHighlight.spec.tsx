import { shallow } from 'enzyme';
import * as React from 'react';
import FuzzyHighlight from '../FuzzyHighlight';

describe('FuzzyHighlight', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('instantiates without crashing', () => {
    const wrapper = shallow(<FuzzyHighlight />);
    expect(wrapper).toBeTruthy();
  });
});
