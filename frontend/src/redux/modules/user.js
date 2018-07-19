//imports
import { history } from "redux/configureStore"; //생성한 store를 불러들임, 히스토리도 불러옴(라우터를 위해))

//actions
const SAVE_TOKEN = "SAVE_TOKEN";
const LOGOUT = "LOGOUT";
const SAVE_AUTHORITY = "SAVE_AUTHORITY";
const SAVE_MEMBERSHIP = "SAVE_MEMBERSHIP";

//action creators : 리덕스 state를 변경

function logout() {
  return {
    type: LOGOUT
  };
}

function saveToken(token) {
  return {
    type: SAVE_TOKEN,
    token //token:token,
  };
}

//회원정보 리덕스에 저장
function saveAuthority(user) {
  const {
    is_staff,
    is_superuser,
    id,
    name,
    username,
    profile_image,
    phone
  } = user;
  return {
    type: SAVE_AUTHORITY,
    is_staff,
    is_superuser,
    id,
    name,
    username,
    profile_image,
    phone
  };
}

function saveMembership(memberships) {
  return {
    type: SAVE_MEMBERSHIP,
    memberships
  };
}

// API actions: api를 부를 때 사용

//회원 정보를 불러옴
// username, name, gender, is_staff, birth, is_superuser, id, profile_image
// checkAuthority로 넘김
function setUser() {
  return function(dispatch, getState) {
    const {
      user: { token, isLoggedIn }
    } = getState();
    if (isLoggedIn) {
      fetch(`/users/`, {
        method: "GET",
        headers: {
          Authorization: `JWT ${token}`
        }
      })
        .then(response => response.json())
        .then(json => {
          dispatch(checkAuthority(json));
        });
    }
  };
}

function setMembership() {
  return function(dispatch, getState) {
    const {
      user: { token, id, isLoggedIn }
    } = getState();
    if (isLoggedIn) {
      fetch(`/membership/${id}/`, {
        method: "GET",
        headers: {
          Authorization: `JWT ${token}`
        }
      })
        .then(response => response.json())
        .then(json => {
          dispatch(saveMembership(json));
        });
    }
  };
}

//권한 검사
// 넘겨받은 회원정보를 통해
function checkAuthority(user) {
  let userId;
  if (user.pk) {
    userId = user.pk;
  } else if (user.id) {
    userId = user.id;
  }
  return function(dispatch, getState) {
    const {
      user: { token }
    } = getState();
    fetch(`/users/id/${userId}/`, {
      method: "GET",
      headers: {
        Authorization: `JWT ${token}`
      }
    })
      .then(response => response.json())
      .then(json => {
        dispatch(saveAuthority(json));
      });
  };
}

function facebookLogin(access_token) {
  return function(dispatch) {
    //thunk를 사용할 때 이렇게 사용하면 조건이 맞아떨어질때 디스패치하도록 조정
    fetch("/users/login/facebook/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        access_token //  access_token:access_token
      })
    })
      .then(response => response.json())
      .then(json => {
        if (json.token) {
          localStorage.setItem("jwt", json.token);
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
    fetch("/rest-auth/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password
      })
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
    fetch("/rest-auth/registration/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password1,
        password2,
        email,
        name
      })
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
  isLoggedIn: localStorage.getItem("jwt") ? true : false,
  is_staff: false,
  is_superuser: false,
  //localStorage는 브라우저에 저장하는 쿠키같은 것
  token: localStorage.getItem("jwt"),
  memberships: null,
  id: null,
  username: null,
  name: null,
  profile_image: null,
  phone: null
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
    case SAVE_MEMBERSHIP:
      return applySaveMembership(state, action);
    default:
      return state;
  }
}
//reducer functions

function applySetToken(state, action) {
  const { token } = action;
  localStorage.setItem("jwt", token);
  return {
    ...state,
    isLoggedIn: true,
    token
  };
}

function applyLogout(state, action) {
  localStorage.removeItem("jwt");

  return {
    isLoggedIn: false
  };
}

function applyAuthority(state, action) {
  const {
    is_staff,
    is_superuser,
    id,
    username,
    name,
    profile_image,
    phone
  } = action;
  return {
    ...state,
    is_staff,
    is_superuser,
    id,
    username,
    name,
    profile_image,
    phone
  };
}

function applySaveMembership(state, action) {
  const { memberships } = action;
  return {
    ...state,
    memberships
  };
}

//exports

const actionCreators = {
  facebookLogin, //facebookLogin : facebookLogin
  usernameLogin,
  createAccount,
  logout,
  setUser,
  setMembership
};

export { actionCreators };
//reducer export

export default reducer;
