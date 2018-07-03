import React, { Component } from 'react';

import { Consumer } from 'context';

export default class Client extends Component {
  render() {
    return <Consumer>{this.renderConsumerContent}</Consumer>;
  }

  renderConsumerContent = (isClient) => {
    return isClient ? this.props.children : null;            
  }
}