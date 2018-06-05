import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";
import Loading from "components/Loading";
import Lounge from "components/Lounge";

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
  return (
    <Lounge branch={props.now_branch.branch} history={props.history} key={1} />
  );
};

LoungeFeed.contextTypes = {
  t: PropTypes.func.isRequired
};

// RenderLoungeFeed.propTypes = {
//   loading: PropTypes.bool.isRequired,
//   now_branch: PropTypes.shape({
//     branch: PropTypes.shape({
//       branch_name: PropTypes.string.isRequired,
//       id: PropTypes.number.isRequired,
//       is_enrolled: PropTypes.bool.isRequired,
//       lounge_img: PropTypes.string.isRequired,
//       width: PropTypes.number.isRequired,
//       height: PropTypes.number.isRequired,
//       rooms: PropTypes.arrayOf(
//         PropTypes.shape({
//           id: PropTypes.number.isRequired,
//           width: PropTypes.number.isRequired,
//           height: PropTypes.number.isRequired,
//           left: PropTypes.number.isRequired,
//           top: PropTypes.number.isRequired,
//           seats: PropTypes.arrayOf(
//             PropTypes.shape({
//               id: PropTypes.number.isRequired,
//               xpos: PropTypes.number.isRequired,
//               usable: PropTypes.bool.isRequired,
//               discard: PropTypes.bool.isRequired
//             }).isRequired
//           ).isRequired
//         })
//       ).isRequired
//     }).isRequired
//   }).isRequired
// };

export default LoungeFeed;
