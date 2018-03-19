import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

const MiniMap = (props, context) => {
  return [<BranchArea branch={props.branch} key={1} />];
};

const BranchArea = props => {
  const {branch} = props;
  const {rooms} = props.branch;
  const x = branch.width / branch.height * 100;
  const y = branch.height / branch.width * 100;

  return (
    <div
      className={styles.branchArea}
      style={{width: x + 'px', height: y + 'px'}}
    >
      {rooms.map(room => <RoomArea {...room} key={room.id} />)}
    </div>
  );
};

const RoomArea = props => (
  <div
    className={styles.room}
    style={{
      left: props.left + '%',
      top: props.top + '%',
      width: props.width + '%',
      height: props.height + '%',
    }}
  >
    {props.seats.map(seat => {
      if (seat.usable && seat.seat_number !== 0)
        return <Seat {...seat} key={seat.id} />;
      else return null;
    })}
  </div>
);

const Seat = props => {
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

MiniMap.propTypes = {
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
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
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
};
export default MiniMap;
