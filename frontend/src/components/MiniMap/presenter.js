import React from "react";
// import PropTypes from "prop-types";
import styles from "./styles.scss";
import MiniMapSeat from "components/MiniMapSeat";

//props = {now_branch.branch}
const MiniMap = (props, context) => {
  const { branch } = props;
  return <BranchArea branch={branch} />;
};

const BranchArea = props => {
  const { branch } = props;
  const { rooms } = props.branch;

  return (
    <div className={styles.branchArea}>
      {rooms.map(room => <RoomArea {...room} key={room.id} />)}
      <img src={branch.minimap_img} alt={branch.branch_name} />
    </div>
  );
};

const RoomArea = props => {
  const { left, top, width, height, seats, id } = props;
  return (
    <div
      className={styles.room}
      style={{
        left: left + "%",
        top: top + "%",
        width: width + "%",
        height: height + "%"
      }}
      key={id}
    >
      {seats.map(seat => {
        if (seat.usable && seat.seat_number !== 0) {
          return (
            <MiniMapSeat
              now_user={seat.now_user}
              left={seat.xpos}
              top={seat.ypos}
              key={seat.id}
              now_using={seat.now_using}
              seat_number={seat.seat_number}
            />
          );
        } else return null;
      })}
    </div>
  );
};

// MiniMap.propTypes = {
//   branch: PropTypes.shape({
//     branch_name: PropTypes.string.isRequired,
//     height: PropTypes.number.isRequired,
//     id: PropTypes.number.isRequired,
//     is_enrolled: PropTypes.bool.isRequired,
//     lounge_img: PropTypes.string.isRequired,
//     width: PropTypes.number.isRequired,
//     rooms: PropTypes.arrayOf(
//       PropTypes.shape({
//         height: PropTypes.number.isRequired,
//         id: PropTypes.number.isRequired,
//         left: PropTypes.number.isRequired,
//         top: PropTypes.number.isRequired,
//         width: PropTypes.number.isRequired,
//         seats: PropTypes.arrayOf(
//           PropTypes.shape({
//             left: PropTypes.number.isRequired,
//             top: PropTypes.number.isRequired,
//             usable: PropTypes.bool.isRequired,
//             discard: PropTypes.bool.isRequired,
//             id: PropTypes.number.isRequired
//           })
//         ).isRequired
//       }).isRequired
//     ).isRequired
//   })
// };
export default MiniMap;
