import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as userActions } from "redux/modules/user";
import { actionCreators as seatActions } from "redux/modules/seat";

//이름 그대로 해석하면됨, State를 Props로 만들어줌
//컴포넌트의 현재 state를 불러옴, 이는 provider store에서 불러옴
const mapStateToProps = (state, ownProps) => {
  const {
    user,
    // routing: { location },
    seat: { now_using }
  } = state;

  return {
    isLoggedIn: user.isLoggedIn,
    userid: user.id,
    now_using: now_using
    // pathname: location.pathname
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    //회원 정보를 세팅하는 함수
    // username, name, gender, is_staff, birth, is_superuser, id, profile_image
    setUser: () => {
      dispatch(userActions.setUser());
    },

    // 현재 이용하고 있는 좌석 정보 불러옴
    // 현재 이용하고 있는 좌석이 없으면 아무런 작업도 하지 않음
    getNowUsing: () => {
      dispatch(seatActions.getNowUsing());
    }
  };
};

// 만든 mapStateToProps를 통해 만든 props를 Container와 연결해줌 그리고 그 Container를 내보냄
export default connect(mapStateToProps, mapDispatchToProps)(Container);
