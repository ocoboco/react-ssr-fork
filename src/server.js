import React, { Component } from 'react';

import { Consumer } from './context';

export default class Server extends Component {
  render() {
    return <Consumer>{this.renderConsumerContent}</Consumer>;
  }

  renderConsumerContent = (isClient) => {
    return isClient ? null : this.props.children;
  }
}