import React, {Component} from 'react';
import Branches from './presenter';

class Container extends Component {
  state = {
    loading: true,
  };
  componentDidMount() {
    const {getBranches} = this.props;
    getBranches();
  }

  render() {
    return <Branches {...this.state} />;
  }
}

export default Container;
