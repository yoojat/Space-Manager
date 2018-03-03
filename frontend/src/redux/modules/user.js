//imports

//actions
const SAVE_TOKEN = 'SAVE_TOKEN';
const LOGOUT = 'LOGOUT';

//action creators : 리덕스 state를 변경

function saveToken(token) {
  return {
    type: SAVE_TOKEN,
    token, //token:token,
  };
}

function logout() {
  return {
    type: LOGOUT,
  };
}

// API actions: api를 부를 때 사용

function facebookLogin(access_token) {
  return function(dispatch) {
    //thunk를 사용할 때 이렇게 사용하면 조건이 맞아떨어질때 디스패치하도록 조정
    fetch('/users/login/facebook/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        access_token, //  access_token:access_token
      }),
    })
      .then(response => response.json())
      .then(json => {
        if (json.token) {
          localStorage.setItem('jwt', json.token);
          dispatch(saveToken(json.token)); //state를 변경하는 saveToken 실행시킴(action creator)
          // dispatch는 액션을 리듀서에게 전달하는 함수
        }
      })
      .catch(err => console.log(err));
  };
}

function usernameLogin(username, password) {
  return function(dispatch) {
    fetch('/rest-auth/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then(response => response.json())
      .then(json => {
        if (json.token) {
          dispatch(saveToken(json.token));
        }
      })
      .catch(err => console.log(err));
  };
}

function createAccount(username, password1, password2, email, name) {
  return function(dispatch) {
    fetch('/rest-auth/registration/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password1,
        password2,
        email,
        name,
      }),
    })
      .then(response => response.json())
      .then(json => {
        if (json.token) {
          dispatch(saveToken(json.token));
        }
      });
  };
}

// iniital state
const initialState = {
  isLoggedIn: localStorage.getItem('jwt') ? true : false,
  //localStorage는 브라우저에 저장하는 쿠키같은 것
  token: localStorage.getItem('jwt'),
};

//reducer
function reducer(state = initialState, action) {
  switch (action.type) {
    case SAVE_TOKEN:
      return applySetToken(state, action);
    case LOGOUT:
      return applyLogout(state, action);
    default:
      return state;
  }
}
//reducer functions

function applySetToken(state, action) {
  const {token} = action;
  localStorage.setItem('jwt', token);
  return {
    ...state,
    isLoggedIn: true,
    token,
  };
}

function applyLogout(state, action) {
  localStorage.removeItem('jwt');
  return {
    isLoggedIn: false,
  };
}

//exports

const actionCreators = {
  facebookLogin, //facebookLogin : facebookLogin
  usernameLogin,
  createAccount,
  logout,
};

export {actionCreators};
//reducer export

export default reducer;
