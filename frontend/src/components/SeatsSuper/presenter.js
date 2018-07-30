import React from "react";
// import PropTypes from "prop-types";
import styles from "./styles.scss";
import Loading from "components/Loading";
import SeatSuper from "components/SeatSuper";
import { Element } from "react-scroll";
import SeatInfo from "components/SeatInfo";

const Seats = props => {
  // let headline;

  // if (props.loading) {
  //   headline = "열람실 정보를 불러오는 중입니다...";
  // } else if (props.onAssignment) {
  //   headline = "좌석의 상태를 변경 중입니다";
  // } else {
  //   headline = <RenderTitle title={sel_room_for_seat_man.room_type.kr_substance} />;
  // }
  const {
    loading,
    sel_room_for_seat_man,
    closeRoom,
    showSeatInfo,
    show_seat_info
  } = props;
  return loading ? (
    <Loading />
  ) : (
    <Element
      name="seats"
      className={styles.container}
      onClick={props.BackClickHandle}
    >
      <div className={styles.overlay}>
        {props.onAssignment ? <div className={styles.loadingSeat} /> : null}
        <div className={styles.box}>
          <div className={styles.content}>
            <header className={styles.header}>
              {/* <h4 className={styles.headline}>{headline}</h4> */}

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
                    sel_room_for_seat_man.view_height /
                      sel_room_for_seat_man.view_width >=
                    2.1
                      ? "50%"
                      : "100%"
                  }`,
                  maxWidth: `${
                    sel_room_for_seat_man.view_height /
                      sel_room_for_seat_man.view_width >=
                    2.1
                      ? "160px"
                      : "400px"
                  }`
                }}
                // style={{
                //   width: `${sel_room_for_seat_man.width >= sel_room_for_seat_man.height ? 300 : 300 / sel_room_for_seat_man.height * sel_room_for_seat_man.width}px`,
                //   height: `${sel_room_for_seat_man.width >= sel_room_for_seat_man.height ? 300 / sel_room_for_seat_man.width * sel_room_for_seat_man.height : 300}px`,
                // }}
              >
                <div
                  style={{
                    paddingTop: `${(sel_room_for_seat_man.view_height /
                      sel_room_for_seat_man.view_width) *
                      100}%`
                  }}
                  className={styles.seats}
                >
                  {sel_room_for_seat_man.seats.map(seat => (
                    <SeatSuper
                      id={seat.id}
                      xpos={seat.view_left}
                      ypos={seat.view_top}
                      rotate={seat.rotate}
                      seat_number={seat.seat_number}
                      usable={seat.usable}
                      seat_image={seat.seat_image}
                      discard={seat.discard}
                      now_user={seat.now_user}
                      desk_size={sel_room_for_seat_man.desk_size}
                      now_using={seat.now_using}
                      key={seat.id}
                      roomId={sel_room_for_seat_man.id}
                      closeRoom={closeRoom}
                      is_processing={seat.is_processing}
                      showSeatInfo={showSeatInfo}
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
      {show_seat_info ? <SeatInfo /> : ""}
    </Element>
  );
};

export default Seats;
