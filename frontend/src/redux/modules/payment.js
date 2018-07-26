//imports
import { actionCreators as enrollMembershipActions } from "redux/modules/enrollMembership";
import { actionCreators as extendMembershipActions } from "redux/modules/extendMembership";
import { actionCreators as extendCabinetActions } from "redux/modules/extendCabinet";
import { actionCreators as enrollCabinetActions } from "redux/modules/enrollCabinet";
import { actionCreators as setupInfoActions } from "redux/modules/setupInfo";
import { actionCreators as staffActions } from "redux/modules/staff";

//actions
const SET_PAY_METHODS = "SET_PAY_METHODS";

//action creators

function setPayMethods(pay_methods) {
  return {
    type: SET_PAY_METHODS,
    pay_methods
  };
}

//call api
//FIXME:비공개 api로
function fetchPaymethods() {
  return function(dispatch, getState) {
    const {
      user: { token }
    } = getState();

    fetch("payment/paymethod/", {
      method: "GET",
      headers: {
        Authorization: `JWT ${token}`
      }
    })
      .then(response => response.json())
      .then(json => dispatch(setPayMethods(json)));
  };
}
function clearProcessing() {
  return async function(dispatch, getState) {
    dispatch(extendMembershipActions.clearExtendMembership());
    dispatch(enrollMembershipActions.clearEnrollMembership());
    dispatch(extendCabinetActions.clearExtendCabinet());
    dispatch(enrollCabinetActions.clearEnrollCabinet());
    dispatch(setupInfoActions.clearSetupInfo());
  };
}

function enrollProcessing() {
  return async function(dispatch, getState) {
    const {
      enrollMembership,
      extendMembership,
      enrollCabinet,
      extendCabinet,
      user
    } = getState();

    let userid;

    if (extendMembership.sel_cost_type) {
      await dispatch(extendMembershipActions.extendMembership());
    }
    if (enrollMembership.sel_cost_type) {
      userid = enrollMembership.target_user.id;
      await dispatch(enrollMembershipActions.enrollMembership());
    }
    if (extendCabinet.sel_cabinet_costtype) {
      //사물함 연장처리
      await dispatch(extendCabinetActions.extendCabinet());
    }
    if (enrollCabinet.sel_cabinet_cost_type) {
      //사물함 등록 처리
      userid = enrollCabinet.target_user.id;
      await dispatch(enrollCabinetActions.enrollCabinet());
    }
    await dispatch(clearProcessing());
    if (!user.is_staff && !user.is_superuser) {
      window.location.href = "/myinfo";
    } else {
      setTimeout(() => {
        dispatch(staffActions.fetchNowViewMember(userid));
      }, 2000);
    }
  };
}

function payCheck(imp_uid, pay_amount) {
  return function(dispatch, getState) {
    const {
      user: { token, id },
      payment: { pay_methods }
      // enrollMembership,
      // extendMembership,
      // enrollCabinet,
      // extendCabinet
    } = getState();

    fetch(`/payment/paycheck/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`
      },
      body: JSON.stringify({
        imp_key: "4764776818840017",
        imp_secret:
          "Pwc5bnVFH4rAyu9bS632KNTwtKQKreXhL9nWxjCfn4PVyZ6r69tRXnnq7ebzs8RdifaPyN5VRURqUXR0",
        imp_uid
      })
    })
      .then(response => response.json())
      .then(json => {
        if (
          json.response.status === "paid" &&
          json.response.amount === pay_amount
        ) {
          const sel_pay_method = json.response.pay_method;
          const sel_pay_method_obj = pay_methods.find(
            pay_method => pay_method.substance === sel_pay_method
          );
          //결제 성공
          //결제 정보 기록
          dispatch(registPayment(id, sel_pay_method_obj.id));
          // 멤버쉽 혹은 사물함 등록 처리
          // if (extendMembership.sel_cost_type) {
          //   dispatch(extendMembershipActions.extendMembership());
          // }
          // if (enrollMembership.sel_cost_type) {
          //   dispatch(enrollMembershipActions.enrollMembership());
          // }
          // if (extendCabinet.sel_cabinet_costtype) {
          //   //사물함 연장처리
          //   dispatch(extendCabinetActions.extendCabinet());
          // }
          // if (enrollCabinet.sel_cabinet_cost_type) {
          //   //사물함 등록 처리
          //   dispatch(enrollCabinetActions.enrollCabinet());
          // }

          dispatch(enrollProcessing());
          // window.location.href = "/myinfo";
        } else {
          //결제 실패
          console.log("결제 실패");
        }
      });
  };
}

//FIXME:비공개 api로
function registPayment(user_id, pay_method) {
  return function(dispath, getState) {
    const {
      user: { token },
      enrollMembership,
      extendMembership,
      enrollCabinet,
      extendCabinet
    } = getState();
    const result_amout =
      (extendMembership.sel_cost_type
        ? extendMembership.sel_cost_type.cost
        : 0) +
      (enrollCabinet.sel_cabinet_cost_type
        ? enrollCabinet.sel_cabinet_cost_type.cost
        : 0) +
      (extendCabinet.sel_cabinet_costtype
        ? extendCabinet.sel_cabinet_costtype.cost
        : 0);
    const membership_cost_type = extendMembership.sel_cost_type
      ? extendMembership.sel_cost_type.id
      : enrollMembership.sel_cost_type
        ? enrollMembership.sel_cost_type.id
        : null;

    fetch(`/payment/${user_id}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`
      },
      body: JSON.stringify({
        // user: user_id,
        membership_cost_type,
        cabinet_cost_type: extendCabinet.sel_cabinet_costtype
          ? extendCabinet.sel_cabinet_costtype.id
          : enrollCabinet.sel_cabinet_cost_type
            ? enrollCabinet.sel_cabinet_cost_type.id
            : null,
        cost_value: result_amout,
        payment_method: pay_method,
        is_usable: true
        // creator: id
      })
    })
      .then(response => response.json())
      .then(json => console.log(json));
  };
}

//initial state
const initialState = {
  pay_methods: []
};

//reducer

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_PAY_METHODS:
      return applySetPayMethods(state, action);
    default:
      return state;
  }
}

function applySetPayMethods(state, action) {
  const { pay_methods } = action;
  return {
    ...state,
    pay_methods
  };
}

//exports

const actionCreators = {
  payCheck,
  registPayment,
  fetchPaymethods,
  enrollProcessing
};

export { actionCreators };
//reducer export

export default reducer;
