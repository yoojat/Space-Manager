import React from 'react';
import PropTypes from 'prop-types';
import MiniMap from 'components/MiniMap';
import Seats from 'components/Seats';
import ClickableArea from 'components/ClickableArea';
import styles from './styles.scss';

const Lounge = (props, context) => {
  const {rooms} = props.branch;
  const {branch} = props;

  return (
    <div className={styles.lounge}>
      <header className={styles.header} />
      <div className={styles.container}>
        <img
          src={branch.lounge_img}
          className={styles.wholeLounge}
          alt={branch.branch_name}
        />
        {rooms.map(room => (
          <ClickableArea {...room} openRoom={props.openRoom} key={room.id} />
        ))}
      </div>
      <MiniMap branch={branch} />
      {props.seeingRoom && (
        <Seats closeRoom={props.closeRoom} seeingRoom={props.seeingRoom} />
      )}
    </div>
  );
};

Lounge.contextTypes = {
  t: PropTypes.func.isRequired,
};
Lounge.propTypes = {
  branch: PropTypes.shape({
    branch_name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    is_enrolled: PropTypes.bool.isRequired,
    lounge_img: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    rooms: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        left: PropTypes.number.isRequired,
        top: PropTypes.number.isRequired,
        seats: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.number.isRequired,
            left: PropTypes.number.isRequired,
            now_using: PropTypes.bool.isRequired,
            usable: PropTypes.bool.isRequired,
            discard: PropTypes.bool.isRequired,
          }).isRequired
        ).isRequired,
      })
    ).isRequired,
  }).isRequired,
  closeRoom: PropTypes.func.isRequired,
  openRoom: PropTypes.func.isRequired,
};

export default Lounge;
