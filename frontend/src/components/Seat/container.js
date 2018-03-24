import React, {Component} from 'react';
import Seat from './presenter';

class Container extends Component {
  render() {
    return <Seat {...this.props} />;
  }
}

export default Container;
