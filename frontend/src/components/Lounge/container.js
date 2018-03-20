import React, {Component} from 'react';
import Lounge from './presenter';

class Container extends Component {
  state = {seeingRoom: false};

  render() {
    return (
      <Lounge
        {...this.props}
        {...this.state}
        openRoom={this._openRoom}
        closeRoom={this._closeRoom}
      />
    );
  }

  //열람실 정보를 인자로 전달
  _openRoom = () => {
    this.setState({
      seeingRoom: true,
    });
  };

  _closeRoom = () => {
    this.setState({
      seeingRoom: false,
    });
  };
}

export default Container;
