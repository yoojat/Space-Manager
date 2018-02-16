import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {routerReducer, routerMiddleware} from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import {composeWithDevTools} from 'redux-devtools-extension';
import {i18nState} from 'redux-i18n';
import user from 'redux/modules/user';

const env = process.env.NODE_ENV;
// process.evn.NODE_ENV를 통하여 dev 혹은 prod환경을 확인 가능

const history = createHistory();
// module(history.createBrowserHistory)를 통해 history생성
// history는 웹에서 일어나는 일을 기록해 놓은 것으로 뒤로가기 같은 기능을 할때 유용할게 활용됨

const middlewares = [thunk, routerMiddleware(history)];
// 미들웨어는 현재 thunk, history를 인자로가지고 있는 routerMiddleware

// 개발환경이라면
if (env === 'development') {
  const {logger} = require('redux-logger');
  middlewares.push(logger);
  //logger라는 미들웨어 추가
}

const reducer = combineReducers({
  user,
  routing: routerReducer,
  i18nState,
});
// combineReducer(redux 모듈)을 통해 리듀서를 모두 통합

export {history};
// 히스토리는 라우터에 연결되기 위해서 사용되는 듯

let store;
if (env === 'development') {
  store = initialState =>
    createStore(reducer, composeWithDevTools(applyMiddleware(...middlewares)));
  // 개발환경일경우 composeWithDevTool로 한번더 작업?
} else {
  store = initialState => createStore(reducer, applyMiddleware(...middlewares));
}

// ...middlewares 는 배열을 쪼개서 인자로 만들어줌

export default store();
