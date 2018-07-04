# React SSR Fork

React SSR Fork facilitates rendering different content on server and client sides, solving effortlessly any hydration issues.  

## Features

* Provides `<Client>` component to render client side content, and `<Server>` for server side
* Automatically solves hydration problem of mismatched client and server side content
* Prevents unecessary client side re-renders when solving hydration mismatch
* Requires minimum setup and is easy to use.

## Usage

Beging with wrapping your main application component inside `<ForkProvider>`. This component contains the business logic of solving hydration mismatch issue, also providing context for `<Client>` and `<Server>` components.  

1) On client side it might look like this:

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

import App from 'your-components/App';

const content = renderToString(
  <ForkProvider>
    <App />    
  </ForkProvider>,
);

// ... do something with `content`
```

3) Then use `<Client>` component to render client side content, and respectively `<Server>` to render server side content. Your `<App>` component might look like this:

```jsx
import React from 'react';

export function App() {
  return (
    <div>
      <Client>
        I am rendered on client side only
      </Client>
      <span>Hello!</span>
      <Server>
        I am rendered on server side only
      </Server>
    </div>
  );
}
```

Note: both `<Client>` and `<Server>` **need** to be wrapped inside `<ForkProvider>`.   