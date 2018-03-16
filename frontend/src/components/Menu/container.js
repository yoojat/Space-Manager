import React, {Component} from 'react';
import Menu from './presenter';

class Container extends Component {
  render() {
    return <Menu {...this.props} />;
  }
}

export default Container;
