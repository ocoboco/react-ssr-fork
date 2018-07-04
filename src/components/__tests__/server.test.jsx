import React from 'react';
import { mount } from 'enzyme';

import Server from 'components/server';
import ForkProvider from 'components/fork-provider';

describe('<Server>', function() {
  test('renders the content on server side', async function() {
    const child = <div>I am child</div>;
    const wrapper = mount(
      <ForkProvider canUseDom={false}>
        <Server>
          {child}
        </Server>
      </ForkProvider>
    );
    expect(wrapper.contains(child)).toBe(true);
  });

  test('renders null on client side', async function() {
    const child = <div>I am child</div>;
    const wrapper = mount(
      <ForkProvider canUseDom={true}>
        <Server>
          {child}
        </Server>
      </ForkProvider>
    );
    expect(wrapper.contains(child)).toBe(false);
  });
});