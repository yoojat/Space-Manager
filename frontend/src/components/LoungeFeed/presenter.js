import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';
import Loading from 'components/Loading';
import Lounge from 'components/Lounge';
import MiniMap from 'components/MiniMap';

const LoungeFeed = props => {
  if (props.loading) {
    return <LoadingFeed />;
  } else if (props.now_branch) {
    return <RenderLoungeFeed {...props} />;
  }
};

const LoadingFeed = props => (
  <div className={styles.loungeFeed}>
    <Loading />
  </div>
);

const RenderLoungeFeed = props => {
  return [<Lounge {...props} key={1} />, <MiniMap key={2} />];
};

LoungeFeed.contextTypes = {
  t: PropTypes.func.isRequired,
};

LoungeFeed.propTypes = {
  loading: PropTypes.bool.isRequired,
  now_branch: PropTypes.shape({
    address: PropTypes.string,
    branch_name: PropTypes.string,
    branch_num: PropTypes.number,
    detail_address: PropTypes.string,
    id: PropTypes.number,
    is_enrolled: PropTypes.bool,
    lat: PropTypes.number,
    lng: PropTypes.number,
    lounge_img: PropTypes.string,
    region: PropTypes.string,
  }),
  rooms: PropTypes.arrayOf(
    PropTypes.shape({
      branch: PropTypes.number,
      desk_size: PropTypes.number,
      height: PropTypes.number,
      left: PropTypes.number,
      room_number: PropTypes.number,
      logs: PropTypes,
    })
  ),
};

export default LoungeFeed;
