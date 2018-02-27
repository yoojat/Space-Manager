import {connect} from 'react-redux';
import Container from './container';

//이름 그대로 해석하면됨, State를 Props로 만들어줌
//컴포넌트의 현재 state를 불러옴, 이는 provider store에서 불러옴
const mapStateToProps = (state, ownProps) => {
  const {user, routing: {location}} = state;
  return {
    isLoggedIn: user.isLoggedIn,
    pathname: location.pathname,
  };
};

// 만든 mapStateToProps를 통해 만든 props를 Container와 연결해줌 그리고 그 Container를 내보냄
export default connect(mapStateToProps)(Container);
