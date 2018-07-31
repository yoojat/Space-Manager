import React from "react";
// import PropTypes from "prop-types";
import styles from "./styles.scss";
import Loading from "components/Loading";
import Seat from "components/Seat";
import { Element } from "react-scroll";

const Seats = props => {
  let headline;

  if (props.loading) {
    headline = "열람실 정보를 불러오는 중입니다...";
  } else if (props.onAssignment) {
    headline = "좌석의 상태를 변경 중입니다";
  } else {
    headline = <RenderTitle title={props.room.room_type.kr_substance} />;
  }
  return (
    <Element
      name="seats"
      className={styles.container}
      data-isback={true}
      onClick={props.BackClickHandle}
    >
      <div className={styles.overlay}>
        {props.onAssignment ? <div className={styles.loadingSeat} /> : null}
        <div className={styles.box}>
          <div className={styles.content}>
            <header className={styles.header}>
              <h4 className={styles.headline}>{headline}</h4>

              {/* <span className={styles.closeRoom} onClick={props.closeRoom}>
              <Ionicon icon="md-close" fontSize="20px" color="black" />
            </span> */}
            </header>
            {props.loading ? (
              <Loading />
            ) : (
              <div
                className={styles.seatContainer}
                style={{
                  width: `${
                    props.room.view_height / props.room.view_width >= 2.1
                      ? "50%"
                      : "100%"
                  }`,
                  maxWidth: `${
                    props.room.view_height / props.room.view_width >= 2.1
                      ? "160px"
                      : "400px"
                  }`
                }}
                // style={{
                //   width: `${props.room.width >= props.room.height ? 300 : 300 / props.room.height * props.room.width}px`,
                //   height: `${props.room.width >= props.room.height ? 300 / props.room.width * props.room.height : 300}px`,
                // }}
              >
                <div
                  style={{
                    paddingTop: `${(props.room.view_height /
                      props.room.view_width) *
                      100}%`
                  }}
                  className={styles.seats}
                >
                  {props.room.seats.map(seat => (
                    <Seat
                      id={seat.id}
                      xpos={seat.view_left}
                      ypos={seat.view_top}
                      rotate={seat.rotate}
                      seat_number={seat.seat_number}
                      usable={seat.usable}
                      seat_image={seat.seat_image}
                      discard={seat.discard}
                      now_user={seat.now_user}
                      desk_size={props.room.desk_size}
                      now_using={seat.now_using}
                      key={seat.id}
                      roomId={props.room.id}
                      closeRoom={props.closeRoom}
                      is_processing={seat.is_processing}
                      end_datetime={seat.end_datetime}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className={styles.colorDisCon}>
            <div className={styles.colorItem}>
              <div
                className={styles.colorBox}
                style={{ backgroundColor: "#CEEEFA" }}
              />
              <span className={styles.colorText}>이용가능</span>
            </div>
            {/* <div className={styles.colorItem}>
              <div
                className={styles.colorBox}
                style={{ backgroundColor: "#374bab" }}
              />
              <span className={styles.colorText}>내 좌석</span>
            </div> */}
            <div className={styles.colorItem}>
              <div
                className={styles.colorBox}
                style={{ backgroundColor: "#33b6cc" }}
              />
              <span className={styles.colorText}>남성 이용중</span>
            </div>
            <div className={styles.colorItem}>
              <div
                className={styles.colorBox}
                style={{ backgroundColor: "#f7465b" }}
              />
              <span className={styles.colorText}>여성이용중</span>
            </div>
          </div>
        </div>
      </div>
    </Element>
  );
};

const RenderTitle = props => props.title;

// Seats.propTypes = {
//   room: PropTypes.shape({
//     branch: PropTypes.number.isRequired,
//     desk_size: PropTypes.number.isRequired,
//     height: PropTypes.number.isRequired,
//     id: PropTypes.number.isRequired,
//     left: PropTypes.number.isRequired,
//     room_number: PropTypes.number.isRequired,
//     room_type: PropTypes.shape({
//       en_substance: PropTypes.string.isRequired,
//       id: PropTypes.number.isRequired,
//       kr_substance: PropTypes.string.isRequired
//     }).isRequired,
//     seats: PropTypes.arrayOf(
//       PropTypes.shape({
//         id: PropTypes.number.isRequired,
//         seat_number: PropTypes.isRequired,
//         xpos: PropTypes.number.isRequired,
//         ypos: PropTypes.number.isRequired,
//         rotate: PropTypes.number.isRequired,
//         usable: PropTypes.bool.isRequired,
//         discard: PropTypes.bool.isRequired,
//         image_url: PropTypes.string
//       }).isRequired
//     ).isRequired
//   })
// };

export default Seats;
