import React from 'react';
import { mount } from 'enzyme';

import Client from 'components/client';
import ForkProvider from 'components/fork-provider';

describe('<Client>', function() {
  test('renders the content on client side', async function() {
    const child = <div>I am child</div>;
    const wrapper = mount(
      <ForkProvider canUseDom={true}>
        <Client>
          {child}
        </Client>
      </ForkProvider>
    );
    expect(wrapper.contains(child)).toBe(true);
  });

  test('renders null on server side', async function() {
    const child = <div>I am child</div>;
    const wrapper = mount(
      <ForkProvider canUseDom={false}>
        <Client>
          {child}
        </Client>
      </ForkProvider>
    );
    expect(wrapper.contains(child)).toBe(false);
  });
});