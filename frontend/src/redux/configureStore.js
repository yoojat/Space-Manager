import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk"; //redux-thunk는 리덕스 스토어로 원할때마다 액션을 보낼수 있게 해줌
import { routerReducer, routerMiddleware } from "react-router-redux";
import createHistory from "history/createBrowserHistory";
import { composeWithDevTools } from "redux-devtools-extension";
import { i18nState } from "redux-i18n"; //번역을 위한 툴
import user from "redux/modules/user";
import branch from "redux/modules/branch";
import seat from "redux/modules/seat";
import cabinet from "redux/modules/cabinet";
// import regist from "redux/modules/regist";
import payment from "redux/modules/payment";
import membership from "redux/modules/membership";
import enrollMembership from "redux/modules/enrollMembership";
import extendMembership from "redux/modules/extendMembership";
import enrollCabinet from "redux/modules/enrollCabinet";
import extendCabinet from "redux/modules/extendCabinet";
import setupInfo from "redux/modules/setupInfo";
import minimap from "redux/modules/minimap";
import staff from "redux/modules/staff";
import staffSeat from "redux/modules/staffSeat";
import staffCabinet from "redux/modules/staffCabinet";
import staffCabinetExtend from "redux/modules/staffCabinetExtend";
import staffCabinetExpire from "redux/modules/staffCabinetExpire";

// 스토어는 여러개의 리듀서를 합칠수 있음

const env = process.env.NODE_ENV;
// process.env.NODE_ENV를 통하여 dev 혹은 prod환경을 확인 가능
// process는 node js의 전체 정보를 가지고 있는 variable

const history = createHistory();
// module(history.createBrowserHistory)를 통해 history생성
// history는 웹에서 일어나는 일을 기록해 놓은 것으로 뒤로가기 같은 기능을 할때 유용할게 활용됨

const middlewares = [thunk, routerMiddleware(history)];
// 미들웨어는 현재 thunk, history를 인자로 가지고 있는 routerMiddleware
// 마들웨어는 액션이 리듀서로 흘러가기전에 동작을 조절함
// router middleware는 리액트 라우터 리덕스인데 히스토리랑 싱크가 되어야함
// 히스토리는 미들웨어, 그리고 라우터랑 연결되어 있음

// 개발환경이라면
if (env === "development") {
  const { logger } = require("redux-logger");
  middlewares.push(logger);
  //logger라는 미들웨어 추가
  //logger는 before after같이 console창에서 state의 변화를 볼 수 있고, 액션도 볼 수 있다.
}

const reducer = combineReducers({
  branch,
  user,
  routing: routerReducer,
  i18nState,
  seat,
  cabinet,
  // regist,
  payment,
  membership,
  enrollMembership,
  extendMembership,
  enrollCabinet,
  extendCabinet,
  setupInfo,
  minimap,
  staff,
  staffSeat,
  staffCabinet,
  staffCabinetExtend,
  staffCabinetExpire
});
// combineReducer(redux 모듈)을 통해 리듀서를 모두 통합
//combineReducers는 각 리듀서들을 합쳐주어 global state로 만들어줌

export { history };
// 히스토리는 export하는 이유는 생성할 라우터(ConnectedRouter)에서 히스토리 오브젝젝트가 필요하기 때문

let store;
if (env === "development") {
  store = initialState =>
    createStore(reducer, composeWithDevTools(applyMiddleware(...middlewares))); //...의 역할은 배열을 unpack해주는 역할, [thunk, router]를 thunk, router로 변경
  // 개발환경일경우 composeWithDevTool로 미들웨어 싱크(redux-devtool-extension에서 온것)
} else {
  store = initialState => createStore(reducer, applyMiddleware(...middlewares));
}

//store는 initialState를 인자를 가지고 createStore를 통해 만들어진 함수
// createStore의 두번째인자는 미들웨어

// ...middlewares 는 배열을 쪼개서 인자로 만들어줌

export default store();
