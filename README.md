# React SSR Fork

React SSR Fork facilitates rendering different content on server and client side, and solves hydration mismatch issue.  

## Features

* Provides `<Client>` component to render client side content, and `<Server>` for server side
* Automatically solves the hydration issue of mismatched client and server side content
* Prevents unecessary client side re-renders when solving hydration mismatch
* Requires minimum setup and is easy to use.

## Installation

Install the library:  

```bash
npm install --save react-ssr-fork
```

## Usage

Wrap your main application component inside `<ForkProvider>`. This component contains the business logic of solving hydration mismatch issue, also provides context for `<Client>` and `<Server>` components.  

1) Your client side entry might look like this (`<ForkProvider>` wrapping is obligatory on client side):

```jsx
// client.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { ForkProvider } from 'react-ssr-fork';
import App from 'your-components/App';

ReactDOM.hydrate(
  <ForkProvider>
    <App />    
  </ForkProvider>,
  document.getElementById('root')
);
```

2) And your server side entry file could look this way (`<ForkProvider>` wrapping can be skipped on server side):

```jsx
// server.jsx
import React from 'react';
import { renderToString } from 'react-dom/server';
import { ForkProvider } from 'react-ssr-fork';
import App from 'your-components/App.jsx';

const content = renderToString(<App />);
// ...
```

3) Then use `<Client>` component to render client side content, and respectively `<Server>` to render server side content. Your `<App>` component might look like this:

```jsx
// App.jsx
import React from 'react';
import { Client, Server } from 'react-ssr-fork';

export default function App() {
  return (
    <div>
      <Client>
        I run on client
      </Client>
      <Server>
        I run on server
      </Server>
    </div>
  );
}
```

Here's what happens when you run the application:

* On server side `<App>` simply renders `<div>I run on server</div>`
* On client side during hydration `<App>` renders `<div>I run on server</div>` (to match the content sent from server), then right away re-renders to actual client content `<div>I run on client</div>`.

## Requirements
* Both `<Client>` and `<Server>` **need** to be wrapped inside `<ForkProvider>` on client side. While on server side `<ForkProvider>` is not obligatory
* On client side the library is intended to be used with `ReactDOM.hydrate()`. Do not use it with `ReactDOM.render()`
* The library works with **React 16.3** and above

## Why not use `this.state.isCient` approach?

`ReactDOM.hydrate()` [documentation](https://reactjs.org/docs/react-dom.html#hydrate) suggests solving hydration mismatch warning using two-pass rendering and `this.state.isClient` flag. Here's a simple imlementation:  

```jsx
import React, { Component } from 'react';

class Message extends Component {
  state = { isClient: false }

  render() {
    return (
      <div>
        {this.state.isClient ? 'I run on server' : 'I run on client'}
      </div>
    );
  }

  componentDidMount() {
    this.setState({ isClient: true });
  }
}

ReactDOM.hydrate(
  <Message />,
  document.getElementById('root')
);
```

On client side during  initial render `this.state.isClient` is `false`. Thus `<Message>` outputs `<div>I run on server</div>`. This output matches the one sent from server side, and React doesn't throw any mismatch warnings during hydration.  

Right away after mounting of `<Message>`, `componentDidMount()` method is invoked and `this.state.isClient` becomes `true`. As result `<Message>` renders `<div>I run on client</div>`.  

As described above, solving hydration mismatch using two-pass rendering works.  

But there is a drawback. If a new instance of `<Message>` is rendered on the client side on later stages, two-pass rendering will be applied even if that's unnecessary. This makes your component slower. That's the problem solved by React SSR Fork library, which prevents unnecessary re-rerending.  

## Unit testing

React SSR Fork components faciliate unit testing of your components.  

`<ForkProvider>` accepts a special boolean prop `canUseDom`. Use it to set manually client or server environment in your unit tests. For example:

```jsx
import React from 'react';
import { mount } from 'enzyme';

import ForkProvider from 'components/fork-provider';

function App() {
  return (
    <div>
      <Client>
        I run on client
      </Client>
      <Server>
        I run on server
      </Server>
    </div>
  );
}

describe('<App>', function () {
  test('renders client content on client side', function () {
    const wrapper = mount(
      <ForkProvider canUseDom={true}>
        <App />
      </ForkProvider>
    );
    expect(wrapper.contains('I run on client')).toBe(true);
    expect(wrapper.contains('I run on server')).toBe(false);
  });

  test('renders server content on server side', function () {
    const wrapper = mount(
      <ForkProvider canUseDom={false}>
        <App />
      </ForkProvider>
    );
    expect(wrapper.contains('I run on client')).toBe(false);
    expect(wrapper.contains('I run on server')).toBe(true);
  });
});
```