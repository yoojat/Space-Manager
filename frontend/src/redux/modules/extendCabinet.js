// imports
import { actionCreators as userActions } from "redux/modules/user";
//actions

const SET_CABINET_EXTEND = "SET_CABINET_EXTEND";
const SET_EXTEND_CABINET_COST_TYPE = "SET_EXTEND_CABINET_COST_TYPE";
const SET_IS_EXTEND_CABINET_TRUE = "SET_IS_EXTEND_CABINET_TRUE";
const SET_IS_EXTEND_CABINET_FALSE = "SET_IS_EXTEND_CABINET_FALSE";
const CLEAR_EXTEND_CABINET = "CLEAR_EXTEND_CABINET";
const SET_EXTEND_CABINET_COST_TYPES = "SET_EXTEND_CABINET_COST_TYPES";
const SET_EXTEND_CABINET_TARGET_USER = "SET_EXTEND_CABINET_TARGET_USER";
//action creators : 리덕스 state를 변경

function setExtendCabinetTargetUser(target_user) {
  return {
    type: SET_EXTEND_CABINET_TARGET_USER,
    target_user
  };
}

function setExtendCabinetCostTypes(cabinet_cost_types) {
  return {
    type: SET_EXTEND_CABINET_COST_TYPES,
    cabinet_cost_types
  };
}

function clearExtendCabinet() {
  return {
    type: CLEAR_EXTEND_CABINET
  };
}

function setCabinetExtend(sel_cabinet) {
  return {
    type: SET_CABINET_EXTEND,
    sel_cabinet
  };
}

function setExtendCabinetCostType(sel_cabinet_costtype) {
  return {
    type: SET_EXTEND_CABINET_COST_TYPE,
    sel_cabinet_costtype
  };
}

function setIsExtendCabinetTrue() {
  return {
    type: SET_IS_EXTEND_CABINET_TRUE
  };
}

function setIsExtendCabinetFalse() {
  return {
    type: SET_IS_EXTEND_CABINET_FALSE
  };
}

// API actions: api를 부를 때 사용

function extendCabinetLog(cabinet_id) {
  return (dispatch, getState) => {
    const {
      user: { token }
    } = getState();

    fetch(`cabinets/extend/log/${cabinet_id}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`
      }
    }).then(response => {
      if (response.status !== 201) {
        console.log("사물함 연장 로그 실패");
      } else {
        console.log("사물함 연장 로그 성공");
      }
    });
  };
}

function extendCabinet() {
  return (dispatch, getState) => {
    const {
      user: { token },
      extendCabinet
    } = getState();

    fetch(`/cabinets/extendCabinet/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`
      },
      body: JSON.stringify({
        cabinets_extend: extendCabinet.cabinets_extend,
        days: extendCabinet.sel_cabinet_costtype.days
      })
    })
      .then(response => {
        if (response.status !== 202) {
          dispatch(userActions.logout());
        }
        return response.json();
      })
      .then(json => {
        dispatch(extendCabinetLog(json.id));
      });
  };
}

function fetchExtendCabinetCostTypes() {
  return function(dispatch, getState) {
    const {
      user: { token, isLoggedIn }
    } = getState();
    if (isLoggedIn) {
      fetch(`/payment/costtype/cabinet/`, {
        method: "GET",
        headers: {
          Authorization: `JWT ${token}`
        }
      })
        .then(response => response.json())
        .then(json => {
          dispatch(setExtendCabinetCostTypes(json));
        });
    }
  };
}

// iniital state
const initialState = {
  is_extend_cabinet: false,
  cabinets_extend: [],
  sel_cabinet_costtype: null,
  extend_cabinet_cost_types: [],
  target_user: null
};

//reducer
function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_CABINET_EXTEND:
      return applySetCabinetExtend(state, action);

    case SET_EXTEND_CABINET_COST_TYPE:
      return applySetExtendCabinetCostType(state, action);

    case SET_IS_EXTEND_CABINET_TRUE:
      return applySetIsExtendCabinetTrue(state, action);

    case SET_IS_EXTEND_CABINET_FALSE:
      return applySetIsExtendCabinetFalse(state, action);

    case CLEAR_EXTEND_CABINET:
      return applyClearExtendCabinet(state, action);

    case SET_EXTEND_CABINET_COST_TYPES:
      return applySetExtendCabinetCostTypes(state, action);

    case SET_EXTEND_CABINET_TARGET_USER:
      return applySetExtendCabinetTargetUser(state, action);

    default:
      return state;
  }
}

//reducer functions

function applySetExtendCabinetTargetUser(state, action) {
  const { target_user } = action;
  return { ...state, target_user };
}

function applySetExtendCabinetCostTypes(state, action) {
  const { cabinet_cost_types } = action;
  return { ...state, extend_cabinet_cost_types: cabinet_cost_types };
}

function applyClearExtendCabinet(state, action) {
  return { ...initialState };
}

function applySetIsExtendCabinetFalse(state, action) {
  return { ...state, is_extend_cabinet: false };
}

function applySetIsExtendCabinetTrue(state, action) {
  return { ...state, is_extend_cabinet: true };
}

function applySetCabinetExtend(state, action) {
  const { sel_cabinet } = action;

  //선택한 사물함이 이미 연장될 리스트에 포함되어 있다면
  if (
    !state.cabinets_extend.find(
      cabinet_to_extend => cabinet_to_extend.id === sel_cabinet.id
    )
  ) {
    return {
      ...state,
      cabinets_extend: [...state.cabinets_extend, sel_cabinet]
    };
    // new_cabinet_to_enrolls.push(sel_cabinet);
  } else {
    return {
      ...state,
      cabinets_extend: state.cabinets_extend.filter(function(cabinets_extend) {
        return cabinets_extend.id !== sel_cabinet.id;
      })
    };
  }
}

function applySetExtendCabinetCostType(state, action) {
  const { sel_cabinet_costtype } = action;
  return {
    ...state,
    sel_cabinet_costtype
  };
}

const actionCreators = {
  setCabinetExtend,
  setExtendCabinetCostType,
  setIsExtendCabinetTrue,
  setIsExtendCabinetFalse,
  clearExtendCabinet,
  fetchExtendCabinetCostTypes,
  extendCabinet,
  setExtendCabinetTargetUser
};

export { actionCreators };

export default reducer;
