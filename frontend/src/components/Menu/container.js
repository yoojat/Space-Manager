import React, { Component } from "react";
import Menu from "./presenter";

class Container extends Component {
  _onLogoutClick = () => {
    // history.push("/");
    this.props.logout();
    window.location.href = "/";
  };
  render() {
    const {
      is_staff,
      is_superuser,
      handleBackClick,
      show,
      first,
      closeMenu
    } = this.props;
    return (
      <Menu
        is_staff={is_staff}
        is_superuser={is_superuser}
        onLogoutClick={this._onLogoutClick}
        handleBackClick={handleBackClick}
        show={show}
        first={first}
        closeMenu={closeMenu}
      />
    );
  }
}

export default Container;
