import React, { Component } from "react";
import Menu from "./presenter";
import { history } from "redux/configureStore"; //생성한 store를 불러들임, 히스토리도 불러옴(라우터를 위해))

class Container extends Component {
  _onLogoutClick = () => {
    history.push("/");
    this.props.logout();
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
