import React, {Component} from 'react';
import MiniMap from './presenter';

class Container extends Component {
  state = {
    loading: true,
  };

  componentDidMount() {
    const {rooms} = this.props;
    if (rooms) {
      this.setState({loading: false});
    }
  }
  render() {
    return <MiniMap {...this.props} {...this.state} />;
  }
}

export default Container;
