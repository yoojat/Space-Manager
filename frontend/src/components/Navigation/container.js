import React, {Component} from 'react';
import Navigation from './presenter';

class Container extends Component {
  state = {
    show: false,
  };

  render() {
    const show = this.state.show;
    return (
      <Navigation
        {...this.props}
        show={show}
        handleMenuClick={this._handleMenuClick}
        handleBackClick={this._handleBackClick}
      />
    );
  }

  _handleMenuClick = () => {
    this.setState(prevState => {
      // setState는 object처럼 관리하는 것외에도 function으로도 관리할수 있음(1개의 argument)
      const {show} = prevState;
      // const action = prevState.action;
      if (show === true) {
        return {
          show: false,
        };
      } else if (show === false) {
        return {
          show: true,
        };
      }
    });
  };

  _handleBackClick = event => {
    const is_back = event.target.getAttribute('data_back');
    if (is_back) {
      this.setState({
        ...this.state,
        show: false,
      });
    }
  };
}

export default Container;
