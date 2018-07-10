import React, { Component, Fragment } from "react";
import EnrollMembershipResult from "./presenter";
import { scroller } from "react-scroll";
import Script from "react-load-script";
import moment from "moment";
let IMP;

class Container extends Component {
  state = {};

  componentDidMount() {
    scroller.scrollTo("EnrollMembershipResult", {
      duration: 1500,
      delay: 100,
      smooth: true,
      offset: 50
    });
  }

  componentWillMount() {
    const { setNowDatetime } = this.props;
    setNowDatetime();
  }
  _onPayClick = () => {
    // this.props.pay();

    const {
      enrollMembership,
      enrollCabinet,
      extendCabinet,
      payCheck,
      my_cabinets //for expired cabinet checking
    } = this.props;

    const expired_cabinet = my_cabinets.find(function(my_cabinet) {
      return moment(my_cabinet.end_date).valueOf() < moment().valueOf();
    });

    if (expired_cabinet) {
      // 만료된 사물함이 있다면
      if (extendCabinet.sel_cabinet_costtype) {
        const expired_cabinet_for_extend = extendCabinet.cabinets_extend.find(
          function(cabinet_extend) {
            return expired_cabinet.id === cabinet_extend.id;
          }
        );
        if (expired_cabinet_for_extend) {
          if (
            moment(expired_cabinet_for_extend.end_date)
              .add(extendCabinet.sel_cabinet_costtype.days * 24, "h")
              .valueOf() < moment().valueOf()
          ) {
            // 연장해도 기간이 안맞다면
            alert("만료된 사물함의 등록기간이 짧습니다.");
            return;
          }
        } else {
          alert(
            "만료된 사물함이 있습니다! 만료된 사물함을 결제 및 정리하셔야 이용 가능하십니다."
          );
          return;
        }
      } else {
        alert(
          "만료된 사물함이 있습니다! 만료된 사물함을 결제 및 정리하셔야 이용 가능하십니다."
        );
        return;
      }
    } else {
      console.log("만료된 사물함 없음");
    }

    IMP = window.IMP; // 생략가능
    IMP.init("imp61646988"); // 'iamport' 대신 부여받은 "가맹점 식별코드"를 사용

    const reulst_name =
      (enrollMembership.sel_cost_type
        ? `${enrollMembership.sel_cost_type.title} 멤버쉽 `
        : "") +
      (enrollCabinet.sel_cabinet_cost_type
        ? `${enrollCabinet.sel_cabinet_cost_type.title} 사물함 등록 `
        : "") +
      (extendCabinet.sel_cabinet_costtype
        ? `${extendCabinet.sel_cabinet_costtype.title} 사물함 연장`
        : "");

    const total_pay_amount = 10; // test

    // const total_pay_amount =
    //   (enrollMembership.sel_cost_type
    //     ? enrollMembership.sel_cost_type.cost
    //     : 0) +
    //   (enrollCabinet.sel_cabinet_cost_type
    //     ? enrollCabinet.sel_cabinet_cost_type.cost
    //     : 0) +
    //   (extendCabinet.sel_cabinet_costtype
    //     ? extendCabinet.sel_cabinet_costtype.cost
    //     : 0);
    IMP.request_pay(
      {
        pg: "html5_inicis", // version 1.1.0부터 지원.
        pay_method: "phone",
        merchant_uid: "merchant_" + new Date().getTime(),
        name: reulst_name,
        amount: total_pay_amount,
        // buyer_email: 'iamport@siot.do',
        buyer_name: enrollMembership.target_user.name
        // buyer_tel: '010-1234-5678',
        // buyer_addr: '서울특별시 강남구 삼성동',
        // buyer_postcode: '123-456',
        // m_redirect_url: "https://localhost:3000"
      },
      function(rsp) {
        // var msg;
        if (rsp.success) {
          //등록처리
          // msg = "결제가 완료되었습니다.";
          // msg += "고유ID : " + rsp.imp_uid;
          // msg += "상점 거래ID : " + rsp.merchant_uid;
          // msg += "결제 금액 : " + rsp.paid_amount;
          // msg += "카드 승인번호 : " + rsp.apply_num;
          payCheck(rsp.imp_uid, total_pay_amount);
        } else {
          // msg = "결제에 실패하였습니다.";
          // msg += "에러내용 : " + rsp.error_msg;
          console.log(`결제에 실패하였습니다. 에러내용 : ${rsp.error_msg}`);
        }

        // console.log(msg);
      }
    );
  };

  render() {
    const {
      enrollMembership,
      enrollCabinet,
      extendCabinet,
      now_datetime
    } = this.props;

    return (
      <Fragment>
        <Script
          url="https://code.jquery.com/jquery-1.12.4.min.js"
          onLoad={this._handleJqueryLoad}
        />
        <Script
          url="https://service.iamport.kr/js/iamport.payment-1.1.5.js"
          onLoad={this._handleIamportLoad}
        />
        <EnrollMembershipResult
          enrollMembership={enrollMembership}
          enrollCabinet={enrollCabinet}
          extendCabinet={extendCabinet}
          now_datetime={now_datetime}
        />
      </Fragment>
    );
  }
}
export default Container;
