import PropTypes from 'prop-types';

import { CAN_USE_DOM } from './constants';
import { Provider } from './context';

export default class ForkProvider extends Component {
  state = {
    initialRender: true
  }

  render() {
    const { children, canUseDom = CAN_USE_DOM } = this.props;
    const canRenderClient = canUseDom && !this.state.initialRender;
    return (
      <Provider value={canRenderClient}>
        {children}
      </Provider>
    );
  }

  componentDidMount() {
    this.setState({
      initialRender: false
    });
  }
}

ForkProvider.propTypes = {
  canUseDom: PropTypes.bool
};