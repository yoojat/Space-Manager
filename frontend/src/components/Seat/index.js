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
          src={image_url ? image_url : require('images/empty_seat.png')}
          alt={image_url ? '배정된 좌석' : '배정되지 않은 좌석'}
        />
      </div>
      <div className={styles.name} style={{transform:`rotate(-${rotate}deg)`}}>{seat_number}</div>
    </div>
  );
};

export default Seat;
