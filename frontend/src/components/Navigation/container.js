import React, {Component} from 'react';
import Navigation from './presenter';

class Container extends Component {
  state = {
    show: false,
  };

  render() {
    return <Navigation {...this.state} show={this.state.show} />;
  }
}

export default Container;
