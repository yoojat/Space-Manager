//imports

import { actionCreators as userActions } from "redux/modules/user";
import { actionCreators as minimapActions } from "redux/modules/minimap";

//actions
const SET_ROOM_SEATS = "SET_ROOM_SEATS";
const LOADING_SEAT = "LOADING_SEAT";
const CANCEL_ALLOCATE_SEAT = "CANCEL_ALLOCATE_SEAT";
const NOW_USING_SEAT = "NOW_USING_SEAT";
const RETURN_SEAT = "RETURN_SEAT";
const CANCEL_RETURN_SEAT = "CANCEL_RETURN_SEAT";
const CLEAR_NOW_USING = "CLEAR_NOW_USING";

//action creators : 리덕스 state를 변경

function clearNowUsing() {
  return {
    type: CLEAR_NOW_USING
  };
}

function loadingSeat(seatId) {
  return {
    type: LOADING_SEAT,
    seatId
  };
}

function setNowUsing(now_using_data) {
  return {
    type: NOW_USING_SEAT,
    now_using_data
  };
}

function setRoomSeats(room) {
  return {
    type: SET_ROOM_SEATS,
    room
  };
}

// API actions: api를 부를 때 사용

//현재 앉아있는 이요하고 있는 좌석 정보를 불러오고 리덕스에 해당 정보 저장
function getNowUsing() {
  return (dispatch, getState) => {
    const {
      user: { token }
    } = getState();
    fetch(`/seats/myseat/`, {
      headers: {
        Authorization: `JWT ${token}`
      }
    })
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else if (response.status === 204) {
          dispatch(clearNowUsing());
        } else {
          dispatch(userActions.logout());
        }
      })
      .then(json => {
        if (json) {
          dispatch(setNowUsing(json));
        }
      });
  };
}

function getRoomSeats(roomId) {
  return (dispatch, getState) => {
    const {
      user: { token }
    } = getState();
    fetch(`/rooms/room/${roomId}/`, {
      headers: {
        Authorization: `JWT ${token}`
      }
    })
      .then(response => {
        if (response.status === 401) {
          dispatch(userActions.logout());
        }
        return response.json();
      })
      .then(json => {
        dispatch(setRoomSeats(json));
      });
  };
}

// function returnSeat(userid) {
//   return (dispatch, getState) => {
//     const {
//       user: { token },
//       seat: {
//         room: { id }
//       }
//     } = getState();

//     const seatId = getState().seat.now_using.seat.id;

//     const stateChange = roomId => {
//       dispatch(getRoomSeats(roomId));
//       // dispatch(branchActions.getBranch());
//       dispatch(getNowUsing());
//     };

//     //optimistic response
//     dispatch(doReturnSeat(seatId));

//     //좌석 반납시도
//     fetch(`/seats/user/${userid}/return/`, {
//       method: "POST",
//       headers: {
//         Authorization: `JWT ${token}`
//       }
//     }).then(response => {
//       if (response.status === 201) {
//         //좌석반납 성공하면 다시 현재 사용정보 세팅 다시할 것
//         stateChange(id);
//       } else {
//         dispatch(doCancelReturnSeat(seatId));
//       }
//     });
//   };
// }

function changeSeat(beforeSeatId, afterSeatId) {
  return (dispatch, getState) => {
    const {
      user: { token }
    } = getState();

    //optimistic response
    dispatch(loadingSeat(beforeSeatId));

    fetch(`/seats/return/${beforeSeatId}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`
      }
    }).then(response => {
      if (response.status === 404 || response.status === 400) {
        dispatch(userActions.logout());
      }

      dispatch(allocateSeat(afterSeatId));
      //멤버쉽이 등록되어있지 않은 경우
      // dispatch(getNowUsing());
      // dispatch(getRoomSeats(room.id));
      // dispatch(minimapActions.getMinimapBranch());
    });
  };
}

function returnSeat(seatId) {
  return (dispatch, getState) => {
    const {
      user: { token },
      seat: { room }
    } = getState();

    //optimistic response
    dispatch(loadingSeat(seatId));

    fetch(`/seats/return/${seatId}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`
      }
    }).then(response => {
      if (response.status === 404 || response.status === 400) {
        dispatch(userActions.logout());
      }
      //멤버쉽이 등록되어있지 않은 경우
      dispatch(getNowUsing());
      dispatch(minimapActions.getMinimapBranch());

      dispatch(getRoomSeats(room.id));
    });
  };
}

function allocateSeat(seatId) {
  return (dispatch, getState) => {
    const {
      user: { id, token, memberships },
      seat: { room }
    } = getState();
    dispatch(loadingSeat(seatId));
    //멤버쉽 검사
    //시작일시가 오늘보다 작거나 같아야 되고
    //종료일시가 오늘보다 크거나 같아야 됨

    const moment = require("moment");

    const usable_membership = memberships.find(my_membership => {
      const start_datetime = my_membership.start_date;
      const end_datetime = my_membership.end_date;
      const now = moment();

      if (
        moment(start_datetime).valueOf() <= now.valueOf() &&
        moment(end_datetime).valueOf() >= now.valueOf()
      ) {
        return true;
      } else {
        return false;
      }
    });

    if (!usable_membership) {
      alert("멤버쉽에 먼저 등록하셔야 이용 가능하십니다!");
      return;
    }

    const membership_end_datetime = usable_membership.end_date;

    let target_end_datetime;
    if (
      moment(membership_end_datetime).valueOf() >=
      moment()
        .add(24, "h")
        .valueOf()
    ) {
      target_end_datetime = moment()
        .add(24, "h")
        .format("YYYY-MM-DD HH:mm:ss");
    } else {
      target_end_datetime = moment(membership_end_datetime).format(
        "YYYY-MM-DD HH:mm:ss"
      );
    }

    //optimistic response
    dispatch(loadingSeat(seatId));

    fetch(`/seats/allocation/${seatId}/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`
      },
      body: JSON.stringify({
        end_datetime: target_end_datetime
      })
    }).then(response => {
      if (response.status === 404 || response.status === 400) {
        dispatch(userActions.logout());
      }
      //멤버쉽이 등록되어있지 않은 경우
      dispatch(getRoomSeats(room.id));
      dispatch(minimapActions.getMinimapBranch());
      dispatch(getNowUsing());
    });
  };
}

// iniital state
const initialState = {
  now_using: null,
  room: {}
};

//reducer
function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_ROOM_SEATS:
      return applySetRoomSeats(state, action);
    case LOADING_SEAT:
      return applyLoadingSeat(state, action);
    case CANCEL_ALLOCATE_SEAT:
      return applyCancelAllocateSeat(state, action);
    case NOW_USING_SEAT:
      return applyNowUsingSeat(state, action);
    case RETURN_SEAT:
      return applyReturnSeat(state, action);
    case CANCEL_RETURN_SEAT:
      return applyCancelReturnSeat(state, action);
    case CLEAR_NOW_USING:
      return applyClearNowUsing(state, action);

    default:
      return state;
  }
}

// reducer functions

function applyClearNowUsing(state, action) {
  return {
    ...state,
    now_using: null
  };
}

function applyNowUsingSeat(state, action) {
  const { now_using_data } = action;
  return {
    ...state,
    now_using: now_using_data
  };
}

function applySetRoomSeats(state, action) {
  const { room } = action;
  return {
    ...state,
    room
  };
}

function applyReturnSeat(state, action) {
  const { seatId } = action;
  const {
    room: { seats }
  } = state;

  const updatedSeats = seats.map(seat => {
    if (seat.id === seatId) {
      return {
        ...seat,
        seat_image: { file: require("images/loading_seat.png") }, //로딩 상태를 보여줌
        now_using: false
      };
    }
    return seat;
  });
  return {
    ...state,
    room: { ...state.room, seats: updatedSeats }
  };
}

function applyLoadingSeat(state, action) {
  const { seatId } = action;
  const {
    room: { seats }
  } = state;
  const updatedSeats = seats.map(seat => {
    if (seat.id === seatId) {
      return {
        ...seat,
        seat_image: { file: require("images/loading2.png") }, //로딩 상태를 보여줌
        now_using: true,
        is_processing: true
      };
    }
    return seat;
  });
  return {
    ...state,
    room: { ...state.room, seats: updatedSeats }
  };
}

function applyCancelReturnSeat(state, action) {
  const { seatId } = action;
  const {
    room: { seats }
  } = state;
  const updatedSeats = seats.map(seat => {
    if (seat.id === seatId) {
      return {
        ...seat,
        // image_url: null,
        now_using: true
      };
    }
    return seat;
  });
  return {
    ...state,
    seat: { room: { seats: updatedSeats } }
  };
}

function applyCancelAllocateSeat(state, action) {
  const { seatId } = action;
  const {
    room: { seats }
  } = state;
  const updatedSeats = seats.map(seat => {
    if (seat.id === seatId) {
      return {
        ...seat,
        image_url: null
        // now_using: false,
      };
    }
    return seat;
  });
  return { ...state, seat: { room: { seats: updatedSeats } } };
}
//exports

const actionCreators = {
  getRoomSeats,
  getNowUsing,
  allocateSeat,
  returnSeat,
  changeSeat
};

export { actionCreators };
//reducer export

export default reducer;
