//imports

//actions
const SAVE_TOKEN = 'SAVE_TOKEN';
const LOGOUT = 'LOGOUT';
const SAVE_AUTHORITY = 'SAVE_AUTHORITY';

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

function saveAuthority(user) {
  const {is_staff, is_superuser} = user;
  return {
    type: SAVE_AUTHORITY,
    is_staff,
    is_superuser,
  };
}

// API actions: api를 부를 때 사용
function checkAuthority(user) {
  const userId = user.pk;
  return function(dispatch, getState) {
    const {user: {token}} = getState();
    fetch(`/users/id/${userId}`, {
      method: 'GET',
      headers: {
        Authorization: `JWT ${token}`,
      },
    })
      .then(response => response.json())
      .then(json => dispatch(saveAuthority(json)));
  };
}

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
          dispatch(checkAuthority(json.user));
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
          dispatch(checkAuthority(json.user));
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
          dispatch(checkAuthority(json.user));
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
    case SAVE_AUTHORITY:
      return applyAuthority(state, action);
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

function applyAuthority(state, action) {
  const {is_staff, is_superuser} = action;
  return {
    ...state,
    is_staff,
    is_superuser,
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
