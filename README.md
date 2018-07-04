# React SSR Fork

React SSR Fork facilitates rendering different content on server and client side, and solves hydration mismatch issue.  

## Features

* Provides `<Client>` component to render client side content, and `<Server>` for server side
* Automatically solves the hydration issue of mismatched client and server side content
* Prevents unecessary client side re-renders when solving hydration mismatch
* Requires minimum setup and is easy to use.

## Usage

Begin with wrapping your main application component inside `<ForkProvider>`. This component contains the business logic of solving hydration mismatch issue, also provides context for `<Client>` and `<Server>` components.  

1) Your client side entry might look like this:

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

2) And your server side entry file could look this way:

```jsx
// server.jsx
import React from 'react';
import { renderToString } from 'react-dom/server';
import { ForkProvider } from 'react-ssr-fork';
import App from 'your-components/App.jsx';

const content = renderToString(
  <ForkProvider>
    <App />    
  </ForkProvider>,
);
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
* Both `<Client>` and `<Server>` **need** to be wrapped inside `<ForkProvider>`
* On client side the library is intended to be used with `ReactDOM.hydrate()`. Do not use it with `ReactDOM.render()`
* The library works with **React 16.3** and above