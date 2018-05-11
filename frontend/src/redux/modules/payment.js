//imports

//actions

const SET_AMOUNT = 'SET_AMOUNT';

//action creators

function setAmount(amount) {
  return {
    type: SET_AMOUNT,
    amount,
  };
}

//initial state
const initialState = {
  amount: 0,
};

//reducer

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_AMOUNT:
      return applySetAmount(state, action);
    default:
      return state;
  }
}

function applySetAmount(state, action) {
  const {amount} = action;
  return {
    ...state,
    amount,
  };
}

//exports

const actionCreators = {
  setAmount,
};

export {actionCreators};
//reducer export

export default reducer;
