import React, {Component} from 'react';
import RegistMembership from './presenter';

class Container extends Component {
  state = {
    loading: true,
  };

  componentDidMount() {
    const {user: {memberships, id}, setMembership} = this.props;
    if (!memberships) {
      if (id) {
        setMembership(id);
      }
    } else {
      this.setState({
        ...this.state,
        loading: false,
      });
    }
  }

  componentWillReceiveProps = nextProps => {
    const {setMembership} = this.props;
    if (nextProps.user.memberships) {
      this.setState({
        ...this.state,
        loading: false,
      });
    } else if (nextProps.user.id) {
      setMembership(nextProps.user.id);
    }
  };

  render() {
    return (
      <RegistMembership
        user={this.props.user}
        {...this.state}
        sel_branch={this.props.sel_branch}
      />
    );
  }
}

export default Container;
