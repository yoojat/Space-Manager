// imports
import { actionCreators as userActions } from "redux/modules/user";

//actions
const SET_MEMBERSHIP_EXTEND = "SET_MEMBERSHIP_EXTEND";
const SET_EXTEND_COST_TYPE = "SET_EXTEND_COST_TYPE";
const SET_ENXTEND_MEMBERSHIP_INFO_SETUP = "SET_ALL_INFO_SETUP";
const SET_ENXTEND_MEMBERSHIP_INFO_NOT_SETUP =
  "SET_ENXTEND_MEMBERSHIP_INFO_NOT_SETUP";
const CLEAR_EXTEND_MEMBERSHIP = "CLEAR_EXTEND_MEMBERSHIP";
const SET_EXTEND_COST_TYPES = "SET_EXTEND_COST_TYPES";

//action creators : 리덕스 state를 변경

function setExtendCostTypes(membership_cost_types) {
  return {
    type: SET_EXTEND_COST_TYPES,
    membership_cost_types
  };
}

function clearExtendMembership() {
  return {
    type: CLEAR_EXTEND_MEMBERSHIP
  };
}

function setExtendMembershipInfoSetup() {
  return {
    type: SET_ENXTEND_MEMBERSHIP_INFO_SETUP
  };
}

function setExtendMembershipInfoNotSetup() {
  return {
    type: SET_ENXTEND_MEMBERSHIP_INFO_NOT_SETUP
  };
}

function setMembershipExtend(membership) {
  return {
    type: SET_MEMBERSHIP_EXTEND,
    membership
  };
}

function setExtendCostType(sel_cost_type) {
  return {
    type: SET_EXTEND_COST_TYPE,
    sel_cost_type
  };
}

// API actions: api를 부를 때 사용

// function fetchSelBranch(branchId) {
//   return (dispatch, getState) => {
//     const {
//       user: { token }
//     } = getState();

//     fetch(`/cabinets/branch/${branchId}/`, {
//       method: "GET",
//       headers: {
//         Authorization: `JWT ${token}`
//       }
//     })
//       .then(response => {
//         if (response.status === 404) {
//           dispatch(userActions.logout());
//         }
//         return response.json();
//       })
//       .then(json => {
//         dispatch(setSelBranch(json));
//       });
//   };
// }

function extendMembership() {
  return (dispatch, getState) => {
    const {
      user: { token },
      extendMembership
    } = getState();

    fetch(`/membership/extend/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`
      },
      body: JSON.stringify({
        membership_id: extendMembership.membership_extend.id,
        days: extendMembership.sel_cost_type.days
      })
    });
  };
}

function fetchExtendMembershipCostTypes() {
  return (dispatch, getState) => {
    const {
      user: { token }
    } = getState();

    fetch(`/payment/costtype/membership/`, {
      method: "GET",
      headers: {
        Authorization: `JWT ${token}`
      }
    })
      .then(response => {
        if (response.status === 404) {
          dispatch(userActions.logout());
        }
        return response.json();
      })
      .then(json => {
        dispatch(setExtendCostTypes(json));
      });
  };
}

// iniital state
const initialState = {
  membership_extend: null,
  sel_cost_type: null,
  extend_membership_info_setup: false,
  membership_cost_types: []
};

//reducer
function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_MEMBERSHIP_EXTEND:
      return applySetMembershipExtend(state, action);
    case SET_EXTEND_COST_TYPE:
      return applySetExtendCostType(state, action);
    case SET_ENXTEND_MEMBERSHIP_INFO_SETUP:
      return applySetExtendMembershipInfoSetup(state, action);
    case SET_ENXTEND_MEMBERSHIP_INFO_NOT_SETUP:
      return applySetExtendMembershipInfoNotSetup(state, action);
    case CLEAR_EXTEND_MEMBERSHIP:
      return applyClearExtendMembership(state, action);
    case SET_EXTEND_COST_TYPES:
      return applySetExtendCostTypes(state, action);
    default:
      return state;
  }
}

//reducer functions

function applySetExtendCostTypes(state, action) {
  const { membership_cost_types } = action;
  return {
    ...state,
    membership_cost_types
  };
}

function applyClearExtendMembership(state, action) {
  return {
    ...initialState
  };
}

function applySetExtendMembershipInfoSetup(state, action) {
  return {
    ...state,
    extend_membership_info_setup: true
  };
}
function applySetExtendMembershipInfoNotSetup(state, action) {
  return {
    ...state,
    extend_membership_info_setup: false
  };
}
function applySetMembershipExtend(state, action) {
  const { membership } = action;
  return {
    ...state,
    membership_extend: membership
  };
}

function applySetExtendCostType(state, action) {
  const { sel_cost_type } = action;
  return {
    ...state,
    sel_cost_type
  };
}

const actionCreators = {
  setMembershipExtend,
  setExtendCostType,
  setExtendMembershipInfoSetup,
  setExtendMembershipInfoNotSetup,
  clearExtendMembership,
  fetchExtendMembershipCostTypes,
  extendMembership
};

export { actionCreators };

export default reducer;
