import React from 'react';
import { mount } from 'enzyme';

import Server from 'components/server';
import ForkProvider from 'components/fork-provider';

describe('<Server>', function () {
  const child = <div>I am child</div>;

  test('renders the content on server side', function () {
    const wrapper = mount(
      <ForkProvider canUseDom={false}>
        <Server>
          {child}
        </Server>
      </ForkProvider>
    );
    expect(wrapper.contains(child)).toBe(true);
  });

  test('renders null on client side', function () {
    const wrapper = mount(
      <ForkProvider canUseDom={true}>
        <Server>
          {child}
        </Server>
      </ForkProvider>
    );
    expect(wrapper.contains(child)).toBe(false);
  });

  test('logs an error when not wrapped in <ForkProvider>', function () {
    const error = console.error;
    console.error = jest.fn();
    mount(
      <Server>
        {child}
      </Server>
    );
    expect(console.error.mock.calls.length).toBe(1);
    console.error = error;
  });
});