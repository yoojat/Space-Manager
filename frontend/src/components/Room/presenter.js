import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';
import Loading from 'components/Loading';
import Ionicon from 'react-ionicons';

const Room = props => {
  return (
    <div className={styles.container}>
      <div className={styles.overlay}>
        <div className={styles.box}>
          <header className={styles.header}>
            <h4>title</h4>
            <span onClick={props.closeRoom}>
              <Ionicon icon="md-close" fontSize="20px" color="black" />
            </span>
          </header>
          <div className={styles.content}>
            {props.loading ? <Loading /> : <RenderRoom room={props.room} />}
          </div>
        </div>
      </div>
    </div>
  );
};

const RenderRoom = props => <div>hello</div>;
Room.propTypes = {
  loading: PropTypes.bool.isRequired,
  closeRoom: PropTypes.func.isRequired,
};

RenderRoom.propTypes = {
  room: PropTypes.shape({
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
  }).isRequired,
};

export default Room;
