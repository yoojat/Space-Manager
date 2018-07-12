import React, { Component } from "react";
import LoungeFeed from "./presenter";

class Container extends Component {
  state = {
    loading: true
  };
  componentWillMount() {
    const { getBranch, getMinimapBranch, now_branch } = this.props;
    getMinimapBranch();
    if (!now_branch) {
      getBranch();
    } else {
      this.setState({
        loading: false
      });
    }
  }
  componentWillReceiveProps = nextProps => {
    // console.log('componentWillReceiveProps', nextProps);
    if (nextProps.now_branch) {
      this.setState({
        loading: false
      });
    }
  };

  render() {
    const { now_branch } = this.props;
    return (
      <LoungeFeed
        {...this.state}
        now_branch={now_branch}
        history={this.props.history}
      />
    );
  }
}

export default Container;
