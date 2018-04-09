import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';
import IoMap from 'react-icons/lib/io/map';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';

const SelectBranch = (props, context) => {
  if (props.loading) {
    return null;
  } else {
    return <RenderSelectBranch {...props} />;
  }
};

const RenderSelectBranch = (props, context) => {
  const selBranchId = Number(props.sel_branch);
  const {showMap} = props;
  const showMapButtonClasses = showMap
    ? `${styles.mapButtonContainer} ${styles.selected}`
    : styles.mapButtonContainer;

  let centerLat = 0;
  let centerLng = 0;

  for (let eachBranch of props.branches) {
    centerLat += eachBranch.lat;
    centerLng += eachBranch.lng;
  }

  centerLat = centerLat / props.branches.length;
  centerLng = centerLng / props.branches.length;

  return (
    <Fragment>
      <div className={styles.buttonContainer}>
        {props.branches.map(branch => {
          console.log('selbranch ID', selBranchId, 'branch.id', branch.id);
          const isSelected = selBranchId === branch.id ? true : false;
          return (
            <BranchSelectButton
              {...branch}
              key={branch.id}
              handleBranchClick={props.handleBranchClick}
              isSelected={isSelected}
            />
          );
        })}
      </div>
      <div
        className={showMapButtonClasses}
        onClick={props.handleShowMapButtonClick}
      >
        <IoMap />
        <span>지도에서 선택하기</span>
      </div>
      {showMap ? (
        <MyMapComponent
          isMarkerShown
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAcxUDoY1yBXRB48zDBYBTUODAUkrc-qWs"
          // googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{height: `100%`}} />}
          containerElement={<div style={{height: `270px`}} />}
          mapElement={<div style={{height: `100%`}} />}
          key={2}
          centerLat={centerLat}
          centerLng={centerLng}
          branches={props.branches}
          handleMarkerClick={props.handleMarkerClick}
        />
      ) : (
        ''
      )}
    </Fragment>
  );
};

const BranchSelectButton = (props, context) => {
  const {isSelected} = props;
  const classes = `${styles.button} ${isSelected ? styles.selected : ''}`;
  return (
    <div className={classes} id={props.id} onClick={props.handleBranchClick}>
      {props.branch_num}호점<br />
      {props.branch_name}
    </div>
  );
};

const MyMapComponent = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      defaultZoom={11}
      defaultCenter={{lat: props.centerLat, lng: props.centerLng}}
    >
      {props.isMarkerShown &&
        props.branches.map(branch => (
          <CustomMarker
            branch={branch}
            key={branch.id}
            handleMarkerClick={props.handleMarkerClick}
          />
        ))}
    </GoogleMap>
  ))
);

const CustomMarker = props => {
  const {branch, handleMarkerClick} = props;

  const onMarkerClick = evt => {
    handleMarkerClick(branch.id);
  };

  return (
    <Marker
      options={{icon: require('images/marker.png')}}
      position={{lat: branch.lat, lng: branch.lng}}
      key={branch.id}
      onClick={onMarkerClick}
    />
  );
};
export default SelectBranch;

RenderSelectBranch.propTypes = {
  branches: PropTypes.arrayOf(
    PropTypes.shape({
      address: PropTypes.string.isRequired,
      branch_name: PropTypes.string.isRequired,
      branch_num: PropTypes.number.isRequired,
      detail_address: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
      lounge_img: PropTypes.string.isRequired,
      region: PropTypes.string.isRequired,
    })
  ).isRequired,
  handleBranchClick: PropTypes.func.isRequired,
  handleShowMapButtonClick: PropTypes.func.isRequired,
  handleMarkerClick: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  selBranchId: PropTypes.string,
  showMap: PropTypes.bool.isRequired,
};
SelectBranch.contextTypes = {
  t: PropTypes.func.isRequired,
};
