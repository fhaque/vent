import React from 'react';
import Enzyme, { mount } from "enzyme";
import Adapter from 'enzyme-adapter-react-15';

import MessageForm from '../scripts/components/MessageForm';

Enzyme.configure({ adapter: new Adapter() });

describe('`MessageForm`', () => {
  let props;
  let mountedComp;
  const component = () => {
    if (!mountedComp) {
      mountedComp = mount(
        <MessageForm {...props} />
      );
    }
    return mountedComp;
  }

  beforeEach(() => {
    props = {
      handleSubmit: jest.fn(),
    };
    mountedComp = undefined;
  });

  it('renders a div', () => {
    const divs = component().find('div');
    expect(divs.length).toBeGreaterThan(0);
  });
  
  it('renders 1 form', () => {
    const forms = component().find('form');
    expect(forms.length).toBe(1);
  });

  describe('Form `msg` input', () => {

    it('is rendered in the form', () => {
      const inputs = component().find('input[name="msg"]');
      console.log(component().find('input[name="msg"]'));
      expect(inputs.length).toBeGreaterThan(0);
      expect(inputs.props().name).toBe('msg');
    });
    
    it('changes value when inputted', () => {
      let input = component().find('input[name="msg"]');
      const msg = 'hello!!!';
      const event = {target: {name: 'msg', value: msg}}

      input.simulate('change',event);
      input = component().update().find('input[name="msg"]');
      expect(input.props().value).toBe(msg);
    });

  });

  describe('Form submission', () => {
    it('triggers the submit handler with the message from the form input', () => {
      let form = component().find('form');
      let input = component().find('input[name="msg"]');
      const msg = 'hello!!!';
      const event = {target: {name: 'msg', value: msg}}

      input.simulate('change',event);
      input = component().update().find('input[name="msg"]');

      form.simulate('submit');

      expect(props.handleSubmit).toHaveBeenCalledTimes(1);
      expect(props.handleSubmit.mock.calls[0][0]).toBe(msg);

    });
  });

});