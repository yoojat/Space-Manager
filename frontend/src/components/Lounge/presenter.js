import React from "react";
import PropTypes from "prop-types";
import MiniMap from "components/MiniMap";
import Seats from "components/Seats";
import ClickableArea from "components/ClickableArea";
import styles from "./styles.scss";
import Modal from "components/Modal";

const Lounge = (props, context) => {
  const { rooms } = props.branch;
  const {
    branch,
    history,
    memberships,
    modalLoading,
    onReturnBtnClick,
    profile_image,
    username,
    name
  } = props;

  return (
    <div className={styles.backWhite}>
      <div className={styles.profileCon}>
        {" "}
        <img
          src={`${profile_image}`}
          className={styles.profileImg}
          alt={context.t("profile")}
        />
        <div className={styles.profileTitle}>
          {username} / {name}
        </div>
      </div>
      <header className={styles.header}>
        현재 계신 곳은 {branch.branch_name} 입니다.
      </header>
      <div className={styles.lounge}>
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
        <MiniMap />
      </div>
      {props.seeingRoom && (
        <Seats closeRoom={props.closeRoom} seeingRoom={props.seeingRoom} />
      )}
      {props.now_using ? (
        <div className={styles.nowContainer}>
          <div className={styles.nowUsing}>
            {props.now_using.seat.room.room_number}열람실{" "}
            {props.now_using.seat.seat_number}번자리를 배정하셨습니다.
          </div>
          <button className={styles.returnBtn} onClick={onReturnBtnClick}>
            좌석 반납하기
          </button>
        </div>
      ) : (
        ""
      )}

      {/* 멤버쉽 확인하고 등록되어 있지않으면 멤버쉽 이동하는 모달창 띄움 */}

      {modalLoading ? (
        ""
      ) : memberships.length ? (
        ""
      ) : (
        <Modal
          content="멤버쉽에 등록해야 열람실을 볼수 있습니다! 3초후 자동으로 멤버십등록화면으로 이동합니다."
          linkButtonUrl="/membership"
          linkButtonContext="멤버쉽 등록하기"
          history={history}
          closeRedirect={true}
          autoRedirect={true}
        />
      )}
    </div>
  );
};

Lounge.contextTypes = {
  t: PropTypes.func.isRequired
};
// Lounge.propTypes = {
//   branch: PropTypes.shape({
//     branch_name: PropTypes.string.isRequired,
//     id: PropTypes.number.isRequired,
//     is_enrolled: PropTypes.bool.isRequired,
//     lounge_img: PropTypes.string.isRequired,
//     width: PropTypes.number.isRequired,
//     height: PropTypes.number.isRequired,
//     rooms: PropTypes.arrayOf(
//       PropTypes.shape({
//         id: PropTypes.number.isRequired,
//         width: PropTypes.number.isRequired,
//         height: PropTypes.number.isRequired,
//         left: PropTypes.number.isRequired,
//         top: PropTypes.number.isRequired,
//         seats: PropTypes.arrayOf(
//           PropTypes.shape({
//             id: PropTypes.number.isRequired,
//             left: PropTypes.number.isRequired,
//             usable: PropTypes.bool.isRequired,
//             discard: PropTypes.bool.isRequired
//           }).isRequired
//         ).isRequired
//       })
//     ).isRequired
//   }).isRequired,
//   closeRoom: PropTypes.func.isRequired,
//   openRoom: PropTypes.func.isRequired
// };

export default Lounge;
