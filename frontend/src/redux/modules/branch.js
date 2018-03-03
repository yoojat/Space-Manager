//imports

//actions

//action creators : 리덕스 state를 변경

// API actions: api를 부를 때 사용

function getBranches() {
  return (dispatch, getState) => {
    fetch('/branch/', {
      method: 'GET',
      headers: {
        'Content-Type': `application/json`,
      },
    })
      .then(response => response.json())
      .then(json => console.log(json));
  };
}

// iniital state
const initialState = {};

//reducer
function reducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
//reducer functions

//exports

const actionCreators = {
  getBranches,
};

export {actionCreators};
//reducer export

export default reducer;
