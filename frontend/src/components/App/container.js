import React, { Component } from "react";
import App from "./presenter";

// index.js에서 받은 props를 사용할수 있음, Container 는 presenter에서 온 App컴포넌트에게 props를 전달하구
// App 컴포넌트를 리턴

class Container extends Component {
  state = {
    user_info: null
  };

  _setMembership = () => {
    this.props.setUser();
    this.props.setMembership();
  };

  componentDidMount() {
    const { setUser } = this.props;
    if (
      this.props.is_staff === undefined &&
      this.props.is_superuser === undefined
    ) {
      setUser();
    }
  }

  render() {
    const { isLoggedIn, pathname, is_staff, is_superuser } = this.props;
    return (
      <App
        isLoggedIn={isLoggedIn}
        pathname={pathname}
        is_staff={is_staff}
        is_superuser={is_superuser}
      />
    );
  }
}
// const Container = props => <App {...props} />;

export default Container;
