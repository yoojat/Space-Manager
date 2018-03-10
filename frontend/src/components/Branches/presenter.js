import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';
import Loading from 'components/Loading';
import BranchMap from 'components/BranchMap';

const Branches = props => {
  if (props.loading) {
    return <LoadingFeed />;
  } else if (props.branches) {
    return <RenderBranches {...props} key={1} />;
  }
};

const LoadingFeed = props => (
  <div className={styles.feed}>
    <Loading />
  </div>
);

const RenderBranches = props => (
  <div className={styles.branchMapContainer}>
    <BranchMap
      isMarkerShown
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDIX92eSEvq89S-aognlVYRVeP5p6ybpO4&v=3.exp&libraries=geometry,drawing,places"
      loadingElement={<div style={{height: `100%`}} />}
      containerElement={<div style={{height: `400px`}} />}
      mapElement={<div style={{height: `100%`}} branches={props.branches} />}
    />,
  </div>
);

Branches.propTypes = {
  loading: PropTypes.bool.isRequired,
  branches: PropTypes.array,
};

export default Branches;
