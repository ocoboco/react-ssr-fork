import React, { Component } from 'react';

import { Consumer } from 'context';
import warn from 'warn';

export default class Client extends Component {
  render() {
    return <Consumer>{this.renderConsumerContent}</Consumer>;
  }

  renderConsumerContent = (isClient) => {
    if (isClient == undefined) {
      warn('<Client> component must be wrapped in <ForkProvider>.');
    }
    return isClient ? this.props.children : null;            
  }
}