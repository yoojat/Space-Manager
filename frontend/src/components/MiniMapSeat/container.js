import React, {Component} from 'react';
import MiniMapSeat from './presenter';

class Container extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.now_using === nextProps.now_using) {
      return false;
    } else {
      return true;
    }
  }
  render() {
    return <MiniMapSeat {...this.props} />;
  }
}

export default Container;
