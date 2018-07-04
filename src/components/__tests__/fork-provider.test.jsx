import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';

import Client from 'components/client';
import Server from 'components/server';
import ForkProvider from 'components/fork-provider';

describe('<ForkProvider>', function () {
  const clientChild = <div>I am client child</div>;
  const serverChild = <div>I am server child</div>;

  test('renders server content when hydrating on client side', function () {
    const componentDidMount = ForkProvider.prototype.componentDidMount;
    ForkProvider.prototype.componentDidMount = function () { };
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

  test('renders client content after mounting on client side', function () {
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

  test('renders server content on server side', function () {
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

  test('hydrate does not throw mismatch warnings', function () {
    document.body.innerHTML = `
      <div id="root"><div>I am server child</div></div>
    `;
    const error = console.error;
    console.error = jest.fn().mockImplementation(error);
    ReactDOM.hydrate(
      <ForkProvider canUseDom={true}>
        <Client>
          {clientChild}
        </Client>
        <Server>
          {serverChild}
        </Server>
      </ForkProvider>,
      document.getElementById('root')
    );
    expect(console.error.mock.calls.length).toBe(0);
    console.error = error;
  });
});