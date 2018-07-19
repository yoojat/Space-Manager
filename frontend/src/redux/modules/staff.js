//imports
import { actionCreators as userActions } from "redux/modules/user";

//actions
const SET_MEMBERSHIPS_BY_DATE = "SET_MEMBERSHIPS_BY_DATE";
const SET_MEMBERS_BY_SEARCHING = "SET_MEMBERS_BY_SEARCHING";
const SET_NOW_VIEW_MEMBER = "SET_NOW_VIEW_MEMBER";
const SET_NOW_VIEW_MEMBER_MEMBERSHIPS = "SET_NOW_VIEW_MEMBER_MEMBERSHIPS";

//action creators : 리덕스 state를 변경

function setNowViewMemberMemberships(now_view_member_memberships) {
  return {
    type: SET_NOW_VIEW_MEMBER_MEMBERSHIPS,
    now_view_member_memberships
  };
}

function setNowViewMember(now_view_user) {
  return {
    type: SET_NOW_VIEW_MEMBER,
    now_view_user
  };
}

function setMembershipsByDate(memberships_by_date) {
  return {
    type: SET_MEMBERSHIPS_BY_DATE,
    memberships_by_date
  };
}

function setMembersBySearching(members) {
  return {
    type: SET_MEMBERS_BY_SEARCHING,
    members
  };
}

// function applySetTodaytoday_memberships(user) {
//   const {
//     is_staff,
//     is_superuser,
//     id,
//     name,
//     username,
//     profile_image,
//     phone
//   } = user;
//   return {
//     type: SAVE_AUTHORITY,
//     is_staff,
//     is_superuser,
//     id,
//     name,
//     username,
//     profile_image,
//     phone
//   };
// }

// API actions: api를 부를 때 사용

// 오늘 가입한 사람, 오늘 등록한 사람 모두 불러옴

function fetchNowViewMemberships(user_id) {
  return function(dispatch, getState) {
    const {
      user: { token }
    } = getState();

    fetch(`membership/${user_id}/`, {
      method: "GET",
      headers: {
        Authorization: `JWT ${token}`
      }
    })
      .then(response => {
        if (response.status !== 200) {
          dispatch(userActions.logout());
        }
        return response.json();
      })
      .then(json => {
        dispatch(setNowViewMemberMemberships(json));
      });
  };
}

function fetchNowViewMember(user_id) {
  return function(dispatch, getState) {
    const {
      user: { token }
    } = getState();
    fetch(`/users/id/${user_id}/`, {
      method: "GET",
      headers: {
        Authorization: `JWT ${token}`
      }
    })
      .then(response => {
        if (response.status !== 200) {
          dispatch(userActions.logout());
        }
        return response.json();
      })
      .then(json => {
        dispatch(setNowViewMember(json));
      });
  };
}

function fetchSearchedMembers(keyword) {
  return function(dispatch, getState) {
    const {
      user: { token }
    } = getState();

    fetch(`/users/search/?keyword=${keyword}`, {
      method: "GET",
      headers: {
        Authorization: `JWT ${token}`
      }
    })
      .then(response => {
        if (response.status !== 200) {
          dispatch(userActions.logout());
        }
        return response.json();
      })
      .then(json => {
        dispatch(setMembersBySearching(json));
      });
  };
}

function fetchMembershipsByDate(select_date) {
  return function(dispatch, getState) {
    const {
      user: { token }
    } = getState();

    fetch(`/membership/bydate/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`
      },
      body: JSON.stringify({
        select_date: select_date
      })
    })
      .then(response => {
        if (response.status !== 200) {
          dispatch(userActions.logout());
        }
        return response.json();
      })
      .then(json => {
        dispatch(setMembershipsByDate(json));
      });
  };
}

function fetchTodayMemberships() {
  return function(dispatch, getState) {
    const {
      user: { token }
    } = getState();

    fetch(`/membership/today/`, {
      method: "GET",
      headers: {
        Authorization: `JWT ${token}`
      }
    })
      .then(response => {
        if (response.status !== 200) {
          dispatch(userActions.logout());
        }
        return response.json();
      })
      .then(json => {
        dispatch(setMembershipsByDate(json));
      });
  };
}

// iniital state
const initialState = {
  memberships_by_date: null,
  found_users: null,
  now_view_user: null,
  now_view_member_memberships: null
};

//reducer
function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_MEMBERSHIPS_BY_DATE:
      return applySetMembershipByDate(state, action);

    case SET_MEMBERS_BY_SEARCHING:
      return applySetMembersBySearching(state, action);

    case SET_NOW_VIEW_MEMBER:
      return applySetNowViewMember(state, action);

    case SET_NOW_VIEW_MEMBER_MEMBERSHIPS:
      return applySetNowViewMemberMembership(state, action);

    default:
      return state;
  }
}
//reducer functions

function applySetNowViewMemberMembership(state, action) {
  const { now_view_member_memberships } = action;
  return { ...state, now_view_member_memberships };
}

function applySetNowViewMember(state, action) {
  const { now_view_user } = action;
  return {
    ...state,
    now_view_user
  };
}

function applySetMembersBySearching(state, action) {
  const { members } = action;
  return {
    ...state,
    found_users: members
  };
}

function applySetMembershipByDate(state, action) {
  const { memberships_by_date } = action;
  return {
    ...state,
    memberships_by_date
  };
}
//exports

const actionCreators = {
  fetchTodayMemberships,
  fetchMembershipsByDate,
  fetchSearchedMembers,
  fetchNowViewMember,
  fetchNowViewMemberships
};

export { actionCreators };
//reducer export

export default reducer;
