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

  componentWillMount() {
    //렌더가 되기전에 회원정보와 현재 사용하고 있는 좌석이 있다면 불러온다
    //기본적인 정보를 불러옴
    const { setUser, getNowUsing } = this.props;
    setUser();
    getNowUsing();
  }

  render() {
    const { isLoggedIn, now_using, userid, my_memberships, user } = this.props;
    return (
      <App
        isLoggedIn={isLoggedIn}
        now_using={now_using}
        userid={userid}
        my_memberships={my_memberships}
        is_staff={user.is_staff}
        is_superuser={user.is_superuser}
      />
    );
  }
}

export default Container;

//리덕스 스토어에서 props를 불러오고 나면 update됨, componentDidMount가 호출됨을 확인할 수 있다
