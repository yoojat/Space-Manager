//imports

// import {actionCreators as userActions} from 'redux/modules/user';

//actions

const ASSIGN_SEAT = 'ASSIGN_SEAT'; // 좌석 배정 액션
const RETURN_SEAT = 'RETURN_SEAT';

//action creators : 리덕스 state를 변경

// function setBranches(branches) {
//   return {
//     type: SET_BRANCHES,
//     branches,
//   };
// }

// API actions: api를 부를 때 사용

// function getBranches() {
//   return (dispatch, getState) => {
//     const {user: {token}} = getState();

//     fetch('/branch/', {
//       method: 'GET',
//       headers: {
//         Authorization: `JWT ${token}`,
//       },
//     })
//       .then(response => {
//         if (response.status === 401) {
//           dispatch(userActions.logout());
//         }
//         return response.json();
//       })
//       .then(json => {
//         dispatch(setBranches(json));
//       });
//   };
// }

function assignSeat(seatId) {
  return (dispatch, getState) => {
    dispatch(doAssignSeat(seatId));
  };
}

// iniital state
const initialState = {};

//reducer
function reducer(state = initialState, action) {
  switch (action.type) {
    case ASSIGN_SEAT:
      return applyAssignSeat(state, action);
    case RETURN_SEAT:
      return applyReturnSeat(state, action);
    default:
      return state;
  }
}

// reducer functions

function applyAssignSeat(state, action) {
  const {seatId} = action;
}

function applyReturnSeat(state, action) {}

// function applySetBranch(state, action) {
//   const {branches} = action;
//   return {
//     ...state,
//     branches,
//   };
// }
//exports

// const actionCreators = {
//   getBranches,
// };

export {actionCreators};
//reducer export

export default reducer;
