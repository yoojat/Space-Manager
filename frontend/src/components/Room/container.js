import React, {Component} from 'react';
import Room from './presenter';

class Container extends Component {
  state = {
    loading: true,
  };

  render() {
    return <Room {...this.props} {...this.state} />;
  }
}

export default Container;
