import React, {Component} from 'react';
import Room from './presenter';

class Container extends Component {
  state = {
    loading: true,
  };

  componentDidMount() {
    const {room} = this.props;
    if (room) {
      this.setState({loading: false});
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.room) {
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    return <Room {...this.props} {...this.state} />;
  }
}

export default Container;
