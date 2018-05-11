import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

const MiniMapSeat = props => {
  const bgColor = props.now_using ? 'red' : '#CBEEFB';
  return (
    <div
      className={styles.seat}
      style={{
        left: props.left + '%',
        top: props.top + '%',
        transform: `rotate(${props.rotate}+deg)`,
        backgroundColor: bgColor,
      }}
    />
  );
};

MiniMapSeat.propTypes = {
  left: PropTypes.number.isRequired,
  top: PropTypes.number.isRequired,
};

export default MiniMapSeat;
