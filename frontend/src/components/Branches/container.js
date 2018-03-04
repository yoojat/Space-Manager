import React, {Component} from 'react';
import Branches from './presenter';

class Container extends Component {
  state = {
    loading: true,
  };
  componentDidMount() {
    //컴포넌트가 마운트되고 난뒤
    const {getBranches} = this.props;
    if (!this.props.branches) {
      getBranches();
    } else {
      this.setState({
        loading: false,
      });
    }
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.branches) {
      this.setState({
        loading: false,
      });
    }
  };

  render() {
    const {branches} = this.props;
    return <Branches {...this.state} branches={branches} />;
  }
}

export default Container;
