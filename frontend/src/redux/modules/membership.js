//imports

//actions
const SET_MY_MEMBERSHIPS = "SET_MY_MEMBERSHIPS"; // 접속한 회원의 멤버쉽 정보 불러와서 스토어에 저장

//action creators : 리덕스 state를 변경

function setMyMemberships(my_memberships) {
  return {
    type: SET_MY_MEMBERSHIPS,
    my_memberships
  };
}
// API actions: api를 부를 때 사용

function fetchMyMemberships() {
  return function(dispatch, getState) {
    const {
      user: { token, isLoggedIn }
    } = getState();
    if (isLoggedIn) {
      fetch(`/membership/my/`, {
        method: "GET",
        headers: {
          Authorization: `JWT ${token}`
        }
      })
        .then(response => response.json())
        .then(json => {
          dispatch(setMyMemberships(json));
        });
    }
  };
}

//회원 정보를 불러옴
// username, name, gender, is_staff, birth, is_superuser, id, profile_image
// checkAuthority로 넘김

//권한 검사
// 넘겨받은 회원정보를 통해

// iniital state
const initialState = {
  my_memberships: null //ok
};

//reducer
function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_MY_MEMBERSHIPS:
      return applySetMyMemberships(state, action);
    default:
      return state;
  }
}
//reducer functions

function applySetMyMemberships(state, action) {
  const { my_memberships } = action;
  return {
    ...state,
    my_memberships
  };
}

//exports

const actionCreators = {
  fetchMyMemberships
};

export { actionCreators };
//reducer export

export default reducer;
