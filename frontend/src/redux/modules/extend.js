//imports

//actions
const SET_MEMBERSHIP_TO_EXTENDED = "SET_MEMBERSHIP_TO_EXTENDED";

//action creators : 리덕스 state를 변경

function setMembershipsToExtended(membership) {
  return {
    type: SET_MEMBERSHIP_TO_EXTENDED,
    membership
  };
}

// API actions: api를 부를 때 사용

// iniital state
const initialState = {
  membership_to_extended: null
};

//reducer
function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_MEMBERSHIP_TO_EXTENDED:
      return applySetMembershipsToExtended(state, action);
    default:
      return state;
  }
}
//reducer functions
function applySetMembershipsToExtended(state, action) {
  const { membership } = action;
  return {
    ...state,
    membership_to_extended: membership
  };
}

//exports

const actionCreators = {
  setMembershipsToExtended
};

export { actionCreators };
//reducer export

export default reducer;
