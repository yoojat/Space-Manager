import React, { Component } from "react";
import SeatSuper from "./presenter";

class Container extends Component {
  state = {
    loading: false
  };

  _onSeatClick = () => {
    const { getSeatInfo, showSeatInfo } = this.props;
    getSeatInfo();
    showSeatInfo();
  };

  render() {
    const {
      id,
      xpos,
      ypos,
      rotate,
      seat_number,
      usable,
      seat_image,
      discard,
      now_user,
      desk_size,
      now_using,
      roomId,
      is_processing,
      closeRoom
    } = this.props;
    return (
      <SeatSuper
        id={id}
        xpos={xpos}
        ypos={ypos}
        rotate={rotate}
        seat_number={seat_number}
        usable={usable}
        seat_image={seat_image}
        discard={discard}
        now_user={now_user}
        desk_size={desk_size}
        now_using={now_using}
        roomId={roomId}
        is_processing={is_processing}
        loading={this.state.loading}
        onSeatClick={this._onSeatClick}
        closeRoom={closeRoom}
      />
    );
  }
}

export default Container;
