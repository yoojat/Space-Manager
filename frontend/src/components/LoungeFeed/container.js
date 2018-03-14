import React, {Component} from 'react';
import LoungeFeed from './presenter';

class Container extends Component {
  render() {
    return <LoungeFeed {...this.props} />;
  }
}

export default Container;
