import React, {Component} from 'react';
import Lounge from './presenter';

class Container extends Component {
  render() {
    return <Lounge {...this.props} />;
  }
}

export default Container;
