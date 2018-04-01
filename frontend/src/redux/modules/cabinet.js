//imports

//actions
const SET_USING_CABINETS = 'SET_USING_CABINETS';

//action creators : 리덕스 state를 변경

function setUsingCabinets(using_cabinets) {
  return {
    type: SET_USING_CABINETS,
    using_cabinets,
  };
}

// API actions: api를 부를 때 사용

function getUsingCabinets() {
  return function(dispatch, getState) {
    const {user: {token, isLoggedIn}} = getState();
    if (isLoggedIn) {
      fetch(`/cabinets/using/`, {
        method: 'GET',
        headers: {
          Authorization: `JWT ${token}`,
        },
      })
        .then(response => response.json())
        .then(json => {
          dispatch(setUsingCabinets(json));
        });
    }
  };
}

// iniital state
const initialState = {};

//reducer
function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USING_CABINETS:
      return applySetUsingCabinets(state, action);
    default:
      return state;
  }
}
//reducer functions

function applySetUsingCabinets(state, action) {
  const {using_cabinets} = action;
  return {
    ...state,
    using_cabinets,
  };
}

//exports

const actionCreators = {
  getUsingCabinets,
};

export {actionCreators};
//reducer export

export default reducer;
