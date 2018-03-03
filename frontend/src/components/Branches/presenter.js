import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';
import Loading from 'components/Loading';

const Branches = props => {
  if (props.loading) {
    return <LoadingFeed />;
  }
};

const LoadingFeed = props => (
  <div className={styles.feed}>
    <Loading />
  </div>
);

Branches.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default Branches;
