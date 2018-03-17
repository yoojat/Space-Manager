import React from 'react';
import PropTypes from 'prop-types';
// import styles from './styles.scss';
import Loading from 'components/Loading';

const MiniMap = props => (
  <div>
    <div>{props.loading ? <Loading /> : <RenderMiniMap />}</div>
  </div>
);

const RenderMiniMap = props => <div>minimap</div>;

const room_type = PropTypes.shape({
  id: PropTypes.number.isRequired,
  en_substance: PropTypes.string.isRequired,
  kr_substance: PropTypes.string.isRequired,
}).isRequired;

const seats_type = PropTypes.arrayOf(
  PropTypes.shape({
    discard: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
    now_using: PropTypes.bool.isRequired,
    rotate: PropTypes.number.isRequired,
    seat_number: PropTypes.number.isRequired,
    top: PropTypes.number.isRequired,
    usable: PropTypes.bool.isRequired,
  })
).isRequired;

MiniMap.propTypes = {
  rooms: PropTypes.arrayOf(
    PropTypes.shape({
      branch: PropTypes.number.isRequired,
      desk_size: PropTypes.number.isRequired,
      id: PropTypes.number.isRequired,
      left: PropTypes.number.isRequired,
      room_number: PropTypes.number.isRequired,
      top: PropTypes.number.isRequired,
      usable: PropTypes.bool.isRequired,
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
      room_type: room_type,
      seats: seats_type,
    })
  ).isRequired,
};
export default MiniMap;

// rooms: PropTypes.arrayOf({
//   branch: PropTypes.number.isRequired,
//   desk_size: PropTypes.number.isRequired,
//   id: PropTypes.number.isRequired,
//   left: PropTypes.number.isRequired,
//   room_number: PropTypes.number.isRequired,
//   top: PropTypes.number.isRequired,
//   usable: PropTypes.bool.isRequired,
//   width: PropTypes.number.isRequired,
//   height: PropTypes.number.isRequired,
//   room_type: PropTypes.shape({
//     id: PropTypes.number.isRequired,
//     en_substance: PropTypes.string.isRequired,
//     kr_substance: PropTypes.string.isRequired,
//   }).isRequired,
//   seats: PropTypes.arrayOf({
//     discard: PropTypes.bool.isRequired,
//     id: PropTypes.number.isRequired,
//     left: PropTypes.number.isRequired,
//     now_using: PropTypes.bool.isRequired,
//     rotate: PropTypes.number.isRequired,
//     seat_number: PropTypes.number.isRequired,
//     top: PropTypes.number.isRequired,
//     usable: PropTypes.bool.isRequired,
//   }).isRequired,
// }).isRequired,
