import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';
import Loading from 'components/Loading';

const Branches = props => {
  if (props.loading) {
    return <LoadingFeed />;
  } else if (props.branches) {
    return <RenderBranches {...props} />;
  }
};

const LoadingFeed = props => (
  <div className={styles.feed}>
    <Loading />
  </div>
);

const RenderBranches = props => (
  <div className={styles.branches}>
    {props.branches.map(branch => branch.branch_name)}
  </div>
);

Branches.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default Branches;
