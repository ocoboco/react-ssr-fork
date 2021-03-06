import React from 'react';
import { mount } from 'enzyme';

import Client from 'components/client';
import ForkProvider from 'components/fork-provider';

describe('<Client>', function() {
  const child = <div>I am child</div>;
  
  test('renders the content on client side', function() {
    const wrapper = mount(
      <ForkProvider canUseDom={true}>
        <Client>
          {child}
        </Client>
      </ForkProvider>
    );
    expect(wrapper.contains(child)).toBe(true);
  });

  test('renders null on server side', function() {
    const wrapper = mount(
      <ForkProvider canUseDom={false}>
        <Client>
          {child}
        </Client>
      </ForkProvider>
    );
    expect(wrapper.contains(child)).toBe(false);
  });

  test('logs an error when not wrapped in <ForkProvider>', function () {
    const error = console.error;
    console.error = jest.fn();
    mount(
      <Client>
        {child}
      </Client>
    );
    expect(console.error.mock.calls.length).toBe(1);
    console.error = error;
  });
});