import React from 'react';
import PropTypes from 'prop-types';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';

// import PhotoActions from "components/PhotoActions";
// import PhotoComments from "components/PhotoComments";
// import TimeStamp from "components/TimeStamp";
// import CommentBox from "components/CommentBox";

const BranchMap = withScriptjs(
  withGoogleMap((props, context) => {
    return (
      <GoogleMap
        defaultZoom={12}
        defaultCenter={{lat: 35.22280305, lng: 129.02808175}}
      >
        {props.isMarkerShown &&
          props.branches.map(branch => (
            <Marker
              position={{lat: branch.lat, lng: branch.lng}}
              key={branch.id}
            />
          ))}
      </GoogleMap>
    );
  })
);
BranchMap.propTypes = {
  branches: PropTypes.arrayOf(
    PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
      id: PropTypes.number.isRequired,
      address: PropTypes.string.isRequired,
      branch_name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default BranchMap;
