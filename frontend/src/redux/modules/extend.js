//imports

//actions
const SET_MEMBERSHIP_TO_EXTENDED = "SET_MEMBERSHIP_TO_EXTENDED";
const SET_EXTEND_COST_TYPE_DEPRECATED = "SET_EXTEND_COST_TYPE_DEPRECATED";
const SET_WILL_EXTEND_CABINET = "SET_WILL_EXTEND_CABINET";
const SET_WILL_DONT_EXTEND_CABINET = "SET_WILL_DONT_EXTEND_CABINET";
const SET_CABINETS_TO_EXTEND = "SET_CABINETS_TO_EXTEND";
const SET_CABINET_COST_TYPE = "SET_CABINET_COST_TYPE";
const SET_ALL_INFO_SETUP = "SET_ALL_INFO_SETUP";
const SET_ALL_INFO_NOT_SETUP = "SET_ALL_INFO_NOT_SETUP";

//action creators : 리덕스 state를 변경

function setAllInfoSetup() {
  return {
    type: SET_ALL_INFO_SETUP
  };
}

function setAllInfoNotSetup() {
  return {
    type: SET_ALL_INFO_NOT_SETUP
  };
}

function setCabinetCostType(cabinet_cost_type) {
  return {
    type: SET_CABINET_COST_TYPE,
    cabinet_cost_type
  };
}

function setCabinetsToExtend(my_cabinet) {
  return {
    type: SET_CABINETS_TO_EXTEND,
    my_cabinet
  };
}

function setWillDontExtendCabinet() {
  return {
    type: SET_WILL_DONT_EXTEND_CABINET
  };
}

function setWillExtendCabinet() {
  return {
    type: SET_WILL_EXTEND_CABINET
  };
}

function setExtendCostType(sel_cost_type) {
  return {
    type: SET_EXTEND_COST_TYPE_DEPRECATED,
    sel_cost_type
  };
}

function setMembershipsToExtended(membership) {
  return {
    type: SET_MEMBERSHIP_TO_EXTENDED,
    membership
  };
}

// API actions: api를 부를 때 사용

// iniital state
const initialState = {
  membership_to_extended: null,
  sel_cost_type: null,
  will_extend_cabinet: false,
  cabinets_to_extended: [],
  sel_cabinet_cost_type: null,
  all_info_setup: false
};

//reducer
function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_MEMBERSHIP_TO_EXTENDED:
      return applySetMembershipsToExtended(state, action);

    case SET_EXTEND_COST_TYPE_DEPRECATED:
      return applySetExtendCostType(state, action);

    case SET_WILL_EXTEND_CABINET:
      return applySetWillExtendCabinet(state, action);

    case SET_WILL_DONT_EXTEND_CABINET:
      return applySetWillDontExtendCabinet(state, action);

    case SET_CABINETS_TO_EXTEND:
      return applySetCabinetsToExtend(state, action);

    case SET_CABINET_COST_TYPE:
      return applySetCabinetCostType(state, action);

    case SET_ALL_INFO_SETUP:
      return applySetAllInfoSetup(state, action);

    case SET_ALL_INFO_NOT_SETUP:
      return applySetAllInfoNotSetup(state, action);

    default:
      return state;
  }
}
//reducer functions

function applySetAllInfoNotSetup(state, action) {
  return {
    ...state,
    all_info_setup: false
  };
}

function applySetAllInfoSetup(state, action) {
  return {
    ...state,
    all_info_setup: true
  };
}

function applySetCabinetCostType(state, action) {
  const { cabinet_cost_type } = action;

  if (
    state.sel_cabinet_cost_type &&
    state.sel_cabinet_cost_type.id === cabinet_cost_type.id
  ) {
    return {
      ...state,
      sel_cabinet_cost_type: null
    };
  } else {
    return {
      ...state,
      sel_cabinet_cost_type: cabinet_cost_type
    };
  }
}

function applySetCabinetsToExtend(state, action) {
  const { my_cabinet } = action;

  //선택한 사물함이 이미 연장될 리스트에 포함되어 있다면
  if (
    !state.cabinets_to_extended.find(
      cabinet_to_extended => cabinet_to_extended.id === my_cabinet.id
    )
  ) {
    return {
      ...state,
      cabinets_to_extended: [...state.cabinets_to_extended, my_cabinet]
    };
    // new_cabinet_to_extendeds.push(my_cabinet);
  } else {
    return {
      ...state,
      cabinets_to_extended: state.cabinets_to_extended.filter(function(
        cabinet_to_extended
      ) {
        return cabinet_to_extended.id !== my_cabinet.id;
      })
    };
  }
}

function applySetWillDontExtendCabinet(state, action) {
  return {
    ...state,
    will_extend_cabinet: false
  };
}

function applySetWillExtendCabinet(state, action) {
  return {
    ...state,
    will_extend_cabinet: true
  };
}

function applySetExtendCostType(state, action) {
  const { sel_cost_type } = action;
  return {
    ...state,
    sel_cost_type
  };
}

function applySetMembershipsToExtended(state, action) {
  const { membership } = action;
  return {
    ...state,
    membership_to_extended: membership
  };
}

//exports

const actionCreators = {
  setMembershipsToExtended,
  setExtendCostType,
  setWillExtendCabinet,
  setWillDontExtendCabinet,
  setCabinetsToExtend,
  setCabinetCostType,
  setAllInfoSetup,
  setAllInfoNotSetup
};

export { actionCreators };
//reducer export

export default reducer;
