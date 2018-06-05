//imports

//actions
const SET_USING_CABINETS = "SET_USING_CABINETS";
const SET_NOW_USING_CABINETS = "SET_NOW_USING_CABINETS";
const SET_MY_CABINETS = "SET_MY_CABINETS";
//action creators : 리덕스 state를 변경

function setUsingCabinets(using_cabinets) {
  return {
    type: SET_USING_CABINETS,
    using_cabinets
  };
}

function setMyCabinets(my_cabinets) {
  return {
    type: SET_MY_CABINETS,
    my_cabinets
  };
}

// API actions: api를 부를 때 사용

//사용하고 있는 캐비넷 정보를 가지고 옴
function fetchMyCabinets() {
  return function(dispatch, getState) {
    const {
      user: { token, isLoggedIn }
    } = getState();
    if (isLoggedIn) {
      fetch(`/cabinets/my/`, {
        method: "GET",
        headers: {
          Authorization: `JWT ${token}`
        }
      })
        .then(response => response.json())
        .then(json => {
          dispatch(setMyCabinets(json));
        });
    }
  };
}

function getUsingCabinets(userid) {
  return function(dispatch, getState) {
    const {
      user: { token, isLoggedIn }
    } = getState();
    if (isLoggedIn) {
      fetch(`/cabinets/using/${userid}/`, {
        method: "GET",
        headers: {
          Authorization: `JWT ${token}`
        }
      })
        .then(response => response.json())
        .then(json => {
          dispatch(setUsingCabinets(json));
        });
    }
  };
}

// iniital state
const initialState = {
  now_using_cabinets: [],
  my_cabinets: null //ok
};

//reducer
function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USING_CABINETS:
      return applySetUsingCabinets(state, action);
    case SET_NOW_USING_CABINETS:
      return applySetNowUsingCabinets(state, action);

    case SET_MY_CABINETS:
      return applySetMyCabinets(state, action);

    default:
      return state;
  }
}
//reducer functions

function applySetUsingCabinets(state, action) {
  const { using_cabinets } = action;
  return {
    ...state,
    using_cabinets
  };
}

function applySetNowUsingCabinets(state, action) {
  const { now_using_cabinets } = action;
  return {
    ...state,
    now_using_cabinets
  };
}

function applySetMyCabinets(state, action) {
  const { my_cabinets } = action;
  return {
    ...state,
    my_cabinets
  };
}

//exports

const actionCreators = {
  getUsingCabinets,
  fetchMyCabinets
};

export { actionCreators };
//reducer export

export default reducer;
