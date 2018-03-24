import React, {Component} from 'react';
import Seats from './presenter';

class Container extends Component {
  state = {
    loading: true,
  };

  // componentDidMount() {
  //   const {room} = this.props;
  //   if (room) {
  //     this.setState({loading: false});
  //     console.log('componentDidMount:true');
  //   } else {
  //     console.log('componentDidMount:false');
  //   }
  // }

  componentWillReceiveProps(nextProps) {
    if (nextProps.room) {
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    return (
      <Seats
        {...this.props}
        {...this.state}
        closeRoom={this._closeRoom}
        BackClickHandle={this._BackClickHandle}
      />
    );
  }

  _closeRoom = () => {
    this.setState({
      loading: true,
    });
    this.props.closeRoom();
  };
  _BackClickHandle = event => {
    const is_back = event.target.getAttribute('data-isback');

    if (is_back) {
      this.setState({
        loading: true,
      });
      this.props.closeRoom();
    }
  };
}

export default Container;
