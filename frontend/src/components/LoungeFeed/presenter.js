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

export default LoungeFeed;
