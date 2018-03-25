import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';
import Loading from 'components/Loading';
import Ionicon from 'react-ionicons';
import Seat from 'components/Seat';

const Seats = props => {
  let headline;

  if (props.loading) {
    headline = '열람실 정보를 불러오는 중입니다...';
  } else if (props.onAssignment) {
    headline = '좌석을 배정중입니다';
  } else {
    headline = <RenderTitle title={props.room.room_type.kr_substance} />;
  }
  return (
    <div
      className={styles.container}
      data-isback={true}
      onClick={props.BackClickHandle}
    >
      <div className={styles.overlay}>
        {props.onAssignment ? <div className={styles.loadingSeat} /> : null}
        <div className={styles.box}>
          <header className={styles.header}>
            <h4>{headline}</h4>

            <span className={styles.closeRoom} onClick={props.closeRoom}>
              <Ionicon icon="md-close" fontSize="20px" color="black" />
            </span>
          </header>
          <div className={styles.content}>
            {props.loading ? (
              <Loading />
            ) : (
              <div
                className={styles.seatContainer}
                style={{
                  height: `${90 / props.room.width * props.room.height}vw`,
                  maxHeight: `${600 / 36 * 20}px`,
                  // width: `${100 *
                  //   props.room.width /
                  //   (props.room.width + props.room.height)}%`,
                  // maxHeight: `${400 / props.room.width * props.room.height}px`,
                  // maxWidth: `${400 / props.room.height * props.room.width}px`,
                }}
              >
                {props.room.seats.map(seat => (
                  <Seat
                    id={seat.id}
                    left={seat.left}
                    top={seat.top}
                    rotate={seat.rotate}
                    seat_number={seat.seat_number}
                    usable={seat.usable}
                    seat_image={seat.seat_image}
                    discard={seat.discard}
                    now_using={seat.now_using}
                    desk_size={props.room.desk_size}
                    key={seat.id}
                    roomId={props.room.id}
                    closeRoom={props.closeRoom}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const RenderTitle = props => props.title;

Seats.propTypes = {
  room: PropTypes.shape({
    branch: PropTypes.number.isRequired,
    desk_size: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
    room_number: PropTypes.number.isRequired,
    room_type: PropTypes.shape({
      en_substance: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      kr_substance: PropTypes.string.isRequired,
    }).isRequired,
    seats: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        seat_number: PropTypes.isRequired,
        left: PropTypes.number.isRequired,
        top: PropTypes.number.isRequired,
        rotate: PropTypes.number.isRequired,
        usable: PropTypes.bool.isRequired,
        discard: PropTypes.bool.isRequired,
        now_using: PropTypes.bool.isRequired,
        image_url: PropTypes.string,
      }).isRequired
    ).isRequired,
  }),
};

export default Seats;