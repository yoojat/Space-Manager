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
        loading: false,
      });
    }
  }

  componentWillReceiveProps = nextProps => {
    const {setMembership} = this.props;
    if (nextProps.user.memberships) {
      this.setState({
        loading: false,
      });
    } else if (nextProps.user.id) {
      setMembership(nextProps.user.id);
    }
  };

  render() {
    return <RegistMembership user={this.props.user} {...this.state} />;
  }
}

export default Container;
