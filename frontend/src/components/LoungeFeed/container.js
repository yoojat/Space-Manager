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
    // console.log('componentWillReceiveProps', nextProps);
    if (nextProps.now_branch) {
      this.setState({
        loading: false,
      });
    }
  };

  shouldComponentUpdate(nextProps, nextState) {
    // console.log(
    //   'shouldComponentUpdate',
    //   nextProps.now_branch !== this.props.now_branch
    // );
    return nextProps.now_branch !== this.props.now_branch;
  }

  componentDidUpdate(preProps, prevState) {
    // console.log('componentDidUpdate');
  }

  render() {
    const {now_branch} = this.props;
    return <LoungeFeed {...this.state} now_branch={now_branch} />;
  }
}

export default Container;