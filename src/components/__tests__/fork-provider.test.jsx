import React from 'react';
import { mount } from 'enzyme';

import Client from 'components/client';
import Server from 'components/server';
import ForkProvider from 'components/fork-provider';

describe('<ForkProvider>', function() {
  test('renders server content first on client side', async function() {
    const clientChild = <div>I am client child</div>;
    const serverChild = <div>I am server child</div>;
    const componentDidMount = ForkProvider.prototype.componentDidMount;
    ForkProvider.prototype.componentDidMount = function() {};
    const wrapper = mount(
      <ForkProvider canUseDom={true}>
        <Client>
          {clientChild}
        </Client>
        <Server>
          {serverChild}
        </Server>
      </ForkProvider>
    );
    expect(wrapper.contains(serverChild)).toBe(true);
    expect(wrapper.contains(clientChild)).toBe(false);
    ForkProvider.prototype.componentDidMount = componentDidMount
  });

  test('renders client content after mounting on client side', async function() {
    const clientChild = <div>I am client child</div>;
    const serverChild = <div>I am server child</div>;
    const wrapper = mount(
      <ForkProvider canUseDom={true}>
        <Client>
          {clientChild}
        </Client>
        <Server>
          {serverChild}
        </Server>
      </ForkProvider>
    );
    expect(wrapper.contains(serverChild)).toBe(false);
    expect(wrapper.contains(clientChild)).toBe(true);
  });

  test('renders server content on server side', async function() {
    const clientChild = <div>I am client child</div>;
    const serverChild = <div>I am server child</div>;
    const wrapper = mount(
      <ForkProvider canUseDom={false}>
        <Client>
          {clientChild}
        </Client>
        <Server>
          {serverChild}
        </Server>
      </ForkProvider>
    );
    expect(wrapper.contains(serverChild)).toBe(true);
    expect(wrapper.contains(clientChild)).toBe(false);
  });
});