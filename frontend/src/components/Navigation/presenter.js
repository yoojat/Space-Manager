import React from "react";
import Ionicon from "react-ionicons";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./styles.scss";
import Menu from "components/Menu";

const Navigation = (props, context) => {
  return (
    <div className={styles.navigation}>
      <div className={styles.inner}>
        <div className={styles.column}>
          <Link to="/">
            <img
              src={require("images/logo.png")}
              className={styles.logo}
              alt={context.t("Logo")}
            />
          </Link>
        </div>

        <div className={styles.column}>
          <div className={styles.navIcon} onClick={props.handleMenuClick}>
            <Ionicon
              icon="md-menu"
              fontSize="32px"
              color={props.show ? "white" : "black"}
            />
          </div>
        </div>
      </div>
      {/* {props.show ? <Menu handleBackClick={props.handleBackClick} /> : null} */}
      <Menu
        handleBackClick={props.handleBackClick}
        closeMenu={props.closeMenu}
        show={props.show}
        first={props.first}
      />
    </div>
  );
};
Navigation.contextTypes = {
  t: PropTypes.func.isRequired
};

Navigation.propTypes = {
  show: PropTypes.bool.isRequired,
  first: PropTypes.bool.isRequired,
  handleMenuClick: PropTypes.func.isRequired,
  handleBackClick: PropTypes.func.isRequired,
  closeMenu: PropTypes.func.isRequired
};

export default Navigation;
