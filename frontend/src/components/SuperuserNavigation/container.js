import React, {Component} from 'react';
import SuperuserNavigation from './presenter';

class Container extends Component {
  state = {
    show: false,
  };

  render() {
    const {is_staff} = this.props;
    const {is_superuser} = this.props;

    return (
      <SuperuserNavigation
        {...this.state}
        is_staff={is_staff}
        is_superuser={is_superuser}
      />
    );
  }
}

export default Container;
