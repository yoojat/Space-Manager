import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

const ClickableArea = props => {
  const width = `${props.width}%`;
  const height = `${props.height}%`;
  const left = `${props.left}%`;
  const top = `${props.top}%`;

  return <div className={styles.room} style={{width, height, left, top}} />;
};

const Lounge = (props, context) => {
  const rooms = props.now_branch.branch.rooms;

  return (
    <div className={styles.lounge}>
      <header className={styles.header} />
      <div className={styles.container}>
        <img
          src={props.now_branch.branch.lounge_img}
          className={styles.wholeLounge}
          alt={props.now_branch.branch.branch_name}
        />
        {rooms.map(room => <ClickableArea {...room} key={room.id} />)};
      </div>
    </div>
  );
};

Lounge.contextTypes = {
  t: PropTypes.func.isRequired,
};
Lounge.propTypes = {
  now_branch: PropTypes.shape({
    branch: PropTypes.shape({
      address: PropTypes.string.isRequired,
      branch_name: PropTypes.string.isRequired,
      branch_num: PropTypes.number.isRequired,
      detail_address: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      is_enrolled: PropTypes.bool.isRequired,
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
      lounge_img: PropTypes.string.isRequired,
      region: PropTypes.string.isRequired,
      rooms: PropTypes.arrayOf(
        PropTypes.shape({
          branch: PropTypes.number.isRequired,
          desk_size: PropTypes.number.isRequired,
          height: PropTypes.number.isRequired,
          left: PropTypes.number.isRequired,
          room_number: PropTypes.number.isRequired,
          id: PropTypes.number.isRequired,
        }).isRequired
      ).isRequired,
    }),
  }).isRequired,
};

export default Lounge;
