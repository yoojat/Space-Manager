import React, {Component} from 'react';
import LoungeFeed from './presenter';

class Container extends Component {
  state = {
    loading: true,
  };
  componentDidMount() {
    const {getBranch} = this.props;
    if (!this.props.here) {
      getBranch();
    } else {
      this.setState({
        loading: false,
      });
    }
  }
  componentWillReceiveProps = nextProps => {
    if (nextProps.here) {
      this.setState({
        loading: false,
      });
    }
  };

  render() {
    const {here} = this.props;
    return <LoungeFeed {...this.state} here={here} />;
  }
}

export default Container;
