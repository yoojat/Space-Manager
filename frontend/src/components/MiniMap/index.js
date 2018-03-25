import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';
import MiniMapSeat from 'components/MiniMapSeat';

//props = {now_branch.branch}
const MiniMap = (props, context) => {
  return <BranchArea branch={props.branch} />;
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
    key={props.id}
  >
    {props.seats.map(seat => {
      if (seat.usable && seat.seat_number !== 0) {
        return (
          <MiniMapSeat
            now_using={seat.now_using}
            left={seat.left}
            top={seat.top}
            key={seat.id}
          />
        );
      } else return null;
    })}
  </div>
);

MiniMap.propTypes = {
  branch: PropTypes.shape({
    branch_name: PropTypes.string.isRequired,
    height: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    is_enrolled: PropTypes.bool.isRequired,
    lounge_img: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    rooms: PropTypes.arrayOf(
      PropTypes.shape({
        height: PropTypes.number.isRequired,
        id: PropTypes.number.isRequired,
        left: PropTypes.number.isRequired,
        top: PropTypes.number.isRequired,
        width: PropTypes.number.isRequired,
        seats: PropTypes.arrayOf(
          PropTypes.shape({
            left: PropTypes.number.isRequired,
            top: PropTypes.number.isRequired,
            usable: PropTypes.bool.isRequired,
            discard: PropTypes.bool.isRequired,
            now_using: PropTypes.bool.isRequired,
            id: PropTypes.number.isRequired,
          })
        ).isRequired,
      }).isRequired
    ).isRequired,
  }),
};
export default MiniMap;