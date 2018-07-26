import React from "react";
// import PropTypes from "prop-types";
import styles from "./styles.scss";
import Loading from "components/Loading";
import Ionicon from "react-ionicons";

const RegistWindow = props => {
  const { content, loading, closeRegistWindow } = props;
  return (
    <div className={styles.container}>
      <div className={styles.overlay}>
        <div className={styles.box}>
          <header className={styles.header}>
            <h4 className={styles.headerName}>타이틀</h4>
            <span className={styles.closeButton} onClick={closeRegistWindow}>
              <Ionicon icon="md-close" fontSize="20px" color="black" />
            </span>
          </header>
          <div id="regist_content" className={styles.content}>
            {loading ? <Loading /> : content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistWindow;
