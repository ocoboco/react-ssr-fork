import React, { Component } from 'react';

import { Consumer } from 'context';
import warn from 'warn';

export default class Server extends Component {
  render() {
    return <Consumer>{this.renderConsumerContent}</Consumer>;
  }

  renderConsumerContent = (isClient) => {
    if (isClient == undefined) {
      warn('<Server> component must be wrapped in <ForkProvider>.');
    }
    return isClient ? null : this.props.children;
  }
}