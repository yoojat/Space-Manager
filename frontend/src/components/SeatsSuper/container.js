import React, { Component } from "react";
import SeatsSuper from "./presenter";
import { scroller } from "react-scroll";

class Container extends Component {
  state = {
    loading: true,
    show_seat_info: false
  };

  _showSeatInfo = () => {
    this.setState({
      ...this.state,
      show_seat_info: true
    });
  };

  componentDidMount() {
    const { sel_room_for_seat_man } = this.props;

    scroller.scrollTo("seats", {
      duration: 1500,
      delay: 100,
      smooth: true,
      offset: 5
    });

    if (sel_room_for_seat_man) {
      this.setState({ ...this.state, loading: false });
    }
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
    if (nextProps.sel_room_for_seat_man) {
      this.setState({
        ...this.state,
        loading: false
      });
    } else {
      this.setState({
        ...this.state,
        loading: true
      });
    }
  }

  render() {
    const { sel_room_for_seat_man, closeRoom } = this.props;
    return (
      <SeatsSuper
        sel_room_for_seat_man={sel_room_for_seat_man}
        loading={this.state.loading}
        closeRoom={closeRoom}
        showSeatInfo={this._showSeatInfo}
        show_seat_info={this.state.show_seat_info}
      />
    );
  }
}

export default Container;
