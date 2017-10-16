import React from 'react';
import Enzyme, { mount } from "enzyme";
import Adapter from 'enzyme-adapter-react-15';

import MessageFloat from '../scripts/components/MessageFloat';

Enzyme.configure({ adapter: new Adapter() });

describe('`MessageFloat`', () => {
  let props;
  let mountedComp;
  const component = () => {
    if (!mountedComp) {
      mountedComp = mount(
        <MessageFloat {...props} />
      );
    }
    return mountedComp;
  }

  beforeEach(() => {
    props = {
      children: <p className="hello-tag">Hello!</p>,
    };
    mountedComp = undefined;
  });

  it('renders a div', () => {
    const divs = component().find('div');
    expect(divs.length).toBeGreaterThan(0);
  });

  it('renders children from props', () => {
    const child = component().find('.hello-tag');

    expect(child.length).toBeGreaterThan(0);
  });

});