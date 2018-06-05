import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";

const Seat = props => {
  //   const {id} = props;
  const {
    xpos,
    ypos,
    rotate,
    usable,
    seat_image,
    discard,
    desk_size,
    seat_number,
    now_using,
    loading
  } = props;

  let seat_state_image;
  let display_number;
  let clickEv;

  if (seat_number === 0) {
    seat_state_image = require("images/entrance.png");
    clickEv = props.closeRoom;
  } else if (discard || usable === false) {
    seat_state_image = require("images/prohibited_seat.png");
    clickEv = null;
  } else if (now_using) {
    seat_state_image = seat_image.file;
    clickEv = null;
  } else {
    seat_state_image = require("images/empty_seat.png");
    clickEv = props.handleSeatClick;
  }

  if (now_using || seat_number === 0) {
    display_number = null;
  } else {
    display_number = seat_number;
  }

  return loading ? (
    ""
  ) : (
    <div
      className={styles.seat}
      style={{
        width: desk_size + "%",
        left: xpos + "%",
        top: ypos + "%",
        transform: `rotate(${rotate}deg)`
      }}
      onClick={clickEv}
    >
      <div className={styles.seatImg}>
        <img
          src={seat_state_image}
          alt={now_using ? "배정된 좌석" : "배정되지 않은 좌석"}
        />
      </div>
      <div
        className={styles.name}
        style={{ transform: `rotate(-${rotate}deg)` }}
      >
        {display_number}
      </div>
    </div>
  );
};

Seat.propTypes = {
  desk_size: PropTypes.number.isRequired,
  discard: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
  image_url: PropTypes.string,
  xpos: PropTypes.number.isRequired,
  rotate: PropTypes.number.isRequired,
  seat_number: PropTypes.number.isRequired,
  ypos: PropTypes.number.isRequired,
  usable: PropTypes.bool.isRequired,
  handleSeatClick: PropTypes.func.isRequired,
  roomId: PropTypes.number.isRequired
};

export default Seat;
