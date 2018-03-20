import React, {Component} from 'react';
import ClickableArea from './presenter';

class Container extends Component {
  render() {
    return <ClickableArea {...this.props} {...this.state} />;
  }
}

export default Container;
