import React, { Component } from "react";
import Seats from "./presenter";
import { scroller } from "react-scroll";

class Container extends Component {
  state = {
    loading: true
  };

  componentDidMount() {
    scroller.scrollTo("seats", {
      duration: 1500,
      delay: 100,
      smooth: true,
      offset: 5
    });
  }

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
        loading: false
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
      loading: true
    });
    this.props.closeRoom();
  };
  _BackClickHandle = event => {
    const is_back = event.target.getAttribute("data-isback");

    if (is_back) {
      this.setState({
        loading: true
      });
      this.props.closeRoom();
    }
  };
}

export default Container;
