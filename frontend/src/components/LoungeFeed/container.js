import React, {Component} from 'react';
import LoungeFeed from './presenter';

class Container extends Component {
  state = {
    loading: true,
  };
  componentDidMount() {
    const {getBranch} = this.props;
    if (!this.props.now_branch) {
      getBranch();
    } else {
      this.setState({
        loading: false,
      });
    }
  }
  componentWillReceiveProps = nextProps => {
    if (nextProps.now_branch) {
      this.setState({
        loading: false,
      });
    }
  };

  render() {
    const {now_branch} = this.props;
    return <LoungeFeed {...this.state} now_branch={now_branch} />;
  }
}

export default Container;
