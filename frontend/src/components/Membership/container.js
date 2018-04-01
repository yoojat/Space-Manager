import React, {Component} from 'react';
import Membership from './presenter';

class Container extends Component {
  state = {
    loading: true,
  };

  componentDidMount() {
    const {
      user: {memberships, id},
      setMembership,
      cabinet,
      setUsingCabinet,
    } = this.props;
    if (!memberships) {
      if (id) {
        setMembership(id);
      }
    } else if (!cabinet.using_cabinets) {
      setUsingCabinet();
    } else {
      this.setState({
        loading: false,
      });
    }
  }

  componentWillReceiveProps = nextProps => {
    const {setMembership, setUsingCabinet} = this.props;
    if (nextProps.user.memberships) {
      if (nextProps.cabinet.using_cabinets) {
        this.setState({
          loading: false,
        });
      } else {
        setUsingCabinet();
      }
    } else if (nextProps.user.id) {
      setMembership(nextProps.user.id);
    }
  };

  render() {
    return (
      <Membership
        user={this.props.user}
        cabinet={this.props.cabinet}
        setMembership={this.props.setMembership}
        {...this.state}
      />
    );
  }
}

export default Container;
