import {connect} from 'react-redux';
import Container from './container';

//이름 그대로 해석하면됨, State를 Props로 만들어줌
const mapStateToProps = (state, ownProps) => {
  const {user} = state;
  return {
    isLoggedIn: user.isLoggedIn,
  };
};

// 만든 mapStateToProps를 통해 만든 props를 Container와 연결해줌 그리고 그 Container를 내보냄
export default connect(mapStateToProps)(Container);
