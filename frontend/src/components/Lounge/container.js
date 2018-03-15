import React, {Component} from 'react';
import Lounge from './presenter';

class Container extends Component {
  render() {
    console.log(this.props);
    return <Lounge {...this.props} />;
  }
}

export default Container;
