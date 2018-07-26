//imports
import { actionCreators as userActions } from "redux/modules/user";
import moment from "moment";
//actions
const SET_MEMBERSHIPS_BY_DATE = "SET_MEMBERSHIPS_BY_DATE";
const SET_MEMBERS_BY_SEARCHING = "SET_MEMBERS_BY_SEARCHING";
const CLEAR_MEMBER_DETAIL_INFO = "CLEAR_MEMBER_DETAIL_INFO";
const SET_NOW_VIEW_MEMBER_SEAT_LOGS = "SET_NOW_VIEW_MEMBER_SEAT_LOGS";
const SET_NOW_VIEW_MEMBER = "SET_NOW_VIEW_MEMBER";
const SET_NOW_VIEW_MEMBERSHIPS = "SET_NOW_VIEW_MEMBERSHIPS";
const SET_NOW_VIEW_CABINETS = "SET_NOW_VIEW_CABINETS";
const SET_TURE_SHOW_DETAIL_VIEW = "SET_TURE_SHOW_DETAIL_VIEW";
const SET_DETAIL_VIEW_LOADING_TRUE = "SET_DETAIL_VIEW_LOADING_TRUE";
const SET_DETAIL_VIEW_LOADING_FALSE = "SET_DETAIL_VIEW_LOADING_FALSE";
const SET_SEEING_REGIST_WINDOW_TRUE = "SET_SEEING_REGIST_WINDOW_TRUE";
const SET_SEEING_REGIST_WINDOW_FALSE = "SET_SEEING_REGIST_WINDOW_FALSE";
//action creators : 리덕스 state를 변경

function setSeeingRegistWindowTrue() {
  return {
    type: SET_SEEING_REGIST_WINDOW_TRUE
  };
}

function setSeeingRegistWindowFalse() {
  return {
    type: SET_SEEING_REGIST_WINDOW_FALSE
  };
}

function setDetailViewLoadingTrue() {
  return {
    type: SET_DETAIL_VIEW_LOADING_TRUE
  };
}

function setDetailViewLoadingFalse() {
  return {
    type: SET_DETAIL_VIEW_LOADING_FALSE
  };
}

function setTrueShowDetailView() {
  return {
    type: SET_TURE_SHOW_DETAIL_VIEW
  };
}

function setNowViewMemberships(memberships) {
  return {
    type: SET_NOW_VIEW_MEMBERSHIPS,
    memberships
  };
}

function setNowViewCabinets(cabinets) {
  return {
    type: SET_NOW_VIEW_CABINETS,
    cabinets
  };
}

function setNowViewMember(member_status) {
  return {
    type: SET_NOW_VIEW_MEMBER,
    member_status
  };
}

function setNowViewMemberSeatLogs(seat_logs) {
  return {
    type: SET_NOW_VIEW_MEMBER_SEAT_LOGS,
    seat_logs
  };
}

function clearMemberDetailInfo() {
  return {
    type: CLEAR_MEMBER_DETAIL_INFO
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

function fetchNowViewMember(user_id) {
  return function(dispatch, getState) {
    const {
      user: { token }
    } = getState();

    dispatch(setDetailViewLoadingTrue());

    fetch(`users/id/${user_id}/`, {
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
        console.log({ json });
        dispatch(setTrueShowDetailView());
        const now_view_user_memberships = json.memberships.filter(
          membership =>
            moment(membership.end_date).valueOf() > moment().valueOf() &&
            membership.is_usable
        );
        const now_view_member_cabinets = json.cabinets.filter(
          cabinet =>
            moment(cabinet.end_date).valueOf() > moment().valueOf() &&
            !cabinet.is_clean
        );

        dispatch(setNowViewMemberships(now_view_user_memberships));
        dispatch(setNowViewCabinets(now_view_member_cabinets));
        dispatch(setNowViewMember(json));

        return true;
      })
      .then(is_complete => {
        dispatch(setDetailViewLoadingFalse());
      });
  };
}

function fetchNowViewMemberSeatHistory(user_id) {
  return function(dispatch, getState) {
    const {
      user: { token }
    } = getState();

    fetch(`seats/log/${user_id}/`, {
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
        dispatch(setNowViewMemberSeatLogs(json));
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
  now_view_member_seat_logs: null,
  show_detail_view: false,
  detail_view_loading: true,
  now_view_member_memberships: null,
  now_view_member_cabinets: null,
  seeing_regist_window: false
};

//reducer
function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_MEMBERSHIPS_BY_DATE:
      return applySetMembershipByDate(state, action);

    case SET_MEMBERS_BY_SEARCHING:
      return applySetMembersBySearching(state, action);

    case SET_NOW_VIEW_MEMBER_SEAT_LOGS:
      return applySetNowViewMemberSeatLogs(state, action);

    case SET_NOW_VIEW_MEMBER:
      return applySetNowViewMember(state, action);

    case SET_NOW_VIEW_MEMBERSHIPS:
      return applySetNowViewMemberships(state, action);

    case SET_NOW_VIEW_CABINETS:
      return applySetNowViewCabinets(state, action);

    case SET_TURE_SHOW_DETAIL_VIEW:
      return applySetTrueShowDetailView(state, action);

    case SET_DETAIL_VIEW_LOADING_TRUE:
      return applySetDetailViewLoadingTrue(state, action);

    case SET_DETAIL_VIEW_LOADING_FALSE:
      return applySetDetailViewLoadingFalse(state, action);

    case SET_SEEING_REGIST_WINDOW_TRUE:
      return applySetSeeingRegistWindowTrue(state, action);

    case SET_SEEING_REGIST_WINDOW_FALSE:
      return applySetSeeingRegistWindowFalse(state, action);

    default:
      return state;
  }
}
//reducer functions
function applySetSeeingRegistWindowTrue(state, action) {
  return {
    ...state,
    seeing_regist_window: true
  };
}
function applySetSeeingRegistWindowFalse(state, action) {
  return {
    ...state,
    seeing_regist_window: false
  };
}
function applySetDetailViewLoadingTrue(state, action) {
  return {
    ...state,
    detail_view_loading: true
  };
}
function applySetDetailViewLoadingFalse(state, action) {
  return {
    ...state,
    detail_view_loading: false
  };
}

function applySetTrueShowDetailView(state, action) {
  return {
    ...state,
    show_detail_view: true
  };
}

function applySetNowViewMemberships(state, action) {
  const { memberships } = action;
  return {
    ...state,
    now_view_member_memberships: memberships
  };
}
function applySetNowViewCabinets(state, action) {
  const { cabinets } = action;
  return {
    ...state,
    now_view_member_cabinets: cabinets
  };
}

function applySetNowViewMember(state, action) {
  const { member_status } = action;
  return {
    ...state,
    now_view_user: member_status
  };
}

function applySetNowViewMemberSeatLogs(state, action) {
  const { seat_logs } = action;
  return {
    ...state,
    now_view_member_seat_logs: seat_logs
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
  fetchNowViewMemberSeatHistory,
  clearMemberDetailInfo,
  fetchNowViewMember,
  setSeeingRegistWindowTrue,
  setSeeingRegistWindowFalse
};

export { actionCreators };
//reducer export

export default reducer;
