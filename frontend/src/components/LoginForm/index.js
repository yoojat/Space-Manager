import {connect} from 'react-redux';
import Container from './container';
import {actionCreators as userActions} from 'redux/modules/user';

// 액션을 리듀서에게 디스패치하는 방법
// const mapDispatchToProps = (dispatch, ownProps) =>{
//   return {
//     dispatch1: ()=>{
//       dispatch(actionCreator)
//     }
//   }
// }

// dispatch는 액션을 리듀서로 보내는 function
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    facebookLogin: access_token => {
      dispatch(userActions.facebookLogin(access_token));
    },
    // facebookLogin함수는 access_token을 인자로 facebookLogin이라는 api action을 실행(인자는 access_token)
    // 위 api action은 actionCreator함수(saveToken)를 리턴
    // saveToken(actionCreator)는 token을 인자로 받고
    // applySetToken은 액션에서 token을 받아 실행시키고
    // 변경된 state를 리턴하여 state값을 변경

    usernameLogin: (email, password) => {
      dispatch(userActions.usernameLogin(email, password));
    },
  };
};

export default connect(null, mapDispatchToProps)(Container);
