import React, {Component} from 'react';
import Auth from './presenter';

class Container extends Component {
  state = {
    action: 'login',
  };
  render() {
    const {action} = this.state;
    return <Auth action={action} changeAction={this._changeAction} />;
  }

  _changeAction = () => {
    this.setState(prevState => {
      // setState는 object처럼 관리하는 것외에도 function으로도 관리할수 있음(1개의 argument)
      const {action} = prevState;
      // const action = prevState.action;
      if (action === 'login') {
        return {
          action: 'signup',
        };
      } else if (action === 'signup') {
        return {
          action: 'login',
        };
      }
    });
  };
}

export default Container;
