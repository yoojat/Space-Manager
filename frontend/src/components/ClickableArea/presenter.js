import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

const ClickableArea = props => {
  const width = `${props.width}%`;
  const height = `${props.height}%`;
  const left = `${props.left}%`;
  const top = `${props.top}%`;

  const onClick = event => {
    props.openRoom();
    props.getRoomSeats();
  };

  return (
    <div
      className={styles.room}
      style={{width, height, left, top}}
      onClick={onClick}
    />
  );
};

ClickableArea.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  left: PropTypes.number.isRequired,
  top: PropTypes.number.isRequired,
  openRoom: PropTypes.func.isRequired,
};

export default ClickableArea;
