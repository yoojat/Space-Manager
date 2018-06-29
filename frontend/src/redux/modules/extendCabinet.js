// imports
// import { actionCreators as userActions } from "redux/modules/user";
//actions

const SET_CABINET_EXTEND = "SET_CABINET_EXTEND";
const SET_CABINET_COST_TYPE = "SET_CABINET_COST_TYPE";
const SET_IS_EXTEND_CABINET_TRUE = "SET_IS_EXTEND_CABINET_TRUE";
const SET_IS_EXTEND_CABINET_FALSE = "SET_IS_EXTEND_CABINET_FALSE";
const CLEAR_EXTEND_CABINET = "CLEAR_EXTEND_CABINET";

//action creators : 리덕스 state를 변경

function clearExtendCabinet() {
  return {
    type: CLEAR_EXTEND_CABINET
  }
}

function setCabinetExtend(sel_cabinet) {
  return {
    type: SET_CABINET_EXTEND,
    sel_cabinet
  };
}

function setCabinetCostType(sel_cabinet_costype) {
  return {
    type: SET_CABINET_COST_TYPE,
    sel_cabinet_costype
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

// iniital state
const initialState = {
  is_extend_cabinet: false,
  cabinets_extend: [],
  sel_cabinet_costtype: null
};

//reducer
function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_CABINET_EXTEND:
      return applySetCabinetExtend(state, action);

    case SET_CABINET_COST_TYPE:
      return applySetCabinetCostType(state, action);

    case SET_IS_EXTEND_CABINET_TRUE:
      return applySetIsExtendCabinetTrue(state, action);

    case SET_IS_EXTEND_CABINET_FALSE:
      return applySetIsExtendCabinetFalse(state, action);

    case CLEAR_EXTEND_CABINET:
      return applyClearExtendCabinet(state, action);

    default:
      return state;
  }
}

//reducer functions

function applyClearExtendCabinet(state, action) {
  return { ...initialState }
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
      cabinets_extend: state.cabinets_extend.filter(function (cabinets_extend) {
        return cabinets_extend.id !== sel_cabinet.id;
      })
    };
  }
}

function applySetCabinetCostType(state, action) {
  const { sel_cabinet_costtype } = action;
  return {
    ...state,
    sel_cabinet_costtype
  };
}

const actionCreators = {
  setCabinetExtend,
  setCabinetCostType,
  setIsExtendCabinetTrue,
  setIsExtendCabinetFalse,
  clearExtendCabinet
};

export { actionCreators };

export default reducer;
