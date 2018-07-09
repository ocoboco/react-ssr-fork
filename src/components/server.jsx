import React, { Component } from 'react';

import { Consumer } from 'context';
import warn from 'warn';

export default class Server extends Component {
  render() {
    return <Consumer>{this.renderConsumerContent}</Consumer>;
  }

  renderConsumerContent = (isClient) => {
    return isClient ? null : this.props.children;
  }
}