import React from 'react';
import PropTypes from 'prop-types';

import { CAN_USE_DOM } from './constants';
import Server from './server';
import Client from './client';

export default class Fork extends Component {
  render() {
    const { isClient } = this.props;
    const { client, server } = this.extractClientAndServer();
    return isClient ? client : server;
  }

  componentDidMount() {
    const { isClient, hydrate, id } = this.props;
    if (!isClient) {
      hydrate(id);
    }
  }

  extractClientAndServer() {
    let { children } = this.props;
    const result = {
      client: null,
      server: null
    };
    if (!children) {
      return result;
    }
    children = Array.isArray(children) ? children : [children];
    for (let index = 0; index < children.length; index++) {
      const child = children[index];
      switch (child.type) {
        case Client:
          result.client = child;
          break;
        case Server:
          result.server = child;
      }
    }
    return result;
  }
}

Fork.propTypes = {
  id: PropTypes.string.isRequired,
  canUseDom: PropTypes.string.isRequired
};

Fork.defaultProps = {
  canUseDom: CAN_USE_DOM
};