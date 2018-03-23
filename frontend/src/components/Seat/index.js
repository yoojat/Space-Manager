import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

const Seat = props => {
  const {id} = props;
  const {left} = props;
  const {top} = props;
  const {rotate} = props;
  const {seat_number} = props;
  const {usable} = props;
  const {image_url} = props;
  const {discard} = props;
  const {now_using} = props;
  const {desk_size} = props;

  let seat_image;
  let display_number;

  if (seat_number === 0) {
    seat_image = require('images/entrance.png');
  } else if (discard || usable === false) {
    seat_image = require('images/prohibited_seat.png');
  } else if (now_using) {
    seat_image = image_url;
  } else {
    seat_image = require('images/empty_seat.png');
  }

  if (now_using || seat_number === 0) {
    display_number = null;
  } else {
    display_number = seat_number;
  }

  return (
    <div
      className={styles.seat}
      style={{
        width: desk_size + '%',
        left: left + '%',
        top: top + '%',
        transform: `rotate(${rotate}deg)`,
      }}
    >
      <div className={styles.seatImg}>
        <img
          src={seat_image}
          alt={image_url ? '배정된 좌석' : '배정되지 않은 좌석'}
        />
      </div>
      <div className={styles.name} style={{transform: `rotate(-${rotate}deg)`}}>
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
  left: PropTypes.number.isRequired,
  now_using: PropTypes.bool.isRequired,
  rotate: PropTypes.number.isRequired,
  seat_number: PropTypes.number.isRequired,
  top: PropTypes.number.isRequired,
  usable: PropTypes.bool.isRequired,
};

export default Seat;
