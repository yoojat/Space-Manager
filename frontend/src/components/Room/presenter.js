import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';
import Loading from 'components/Loading';
import Ionicon from 'react-ionicons';

const Room = props => (
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
          {props.loading ? <Loading /> : null}
        </div>
      </div>
    </div>
  </div>
);

Room.propTypes = {
  loading: PropTypes.bool.isRequired,
  closeRoom: PropTypes.func.isRequired,
};

export default Room;
