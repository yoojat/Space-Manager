import React, {Component, Fragment} from 'react';
import Payment from './presenter';
import {scroller} from 'react-scroll';
import Script from 'react-load-script';

let IMP;

class Container extends Component {
  state = {};

  _scrollTo = () => {
    scroller.scrollTo('payment', {
      duration: 1500,
      delay: 100,
      smooth: true,
      offset: 50,
    });
  };

  componentDidMount() {
    this._scrollTo();
  }
  componentWillReceiveProps(nextProps) {}
  //   componentDidMount() {
  //     const {
  //       user: {memberships, id},
  //       setMembership,
  //     } = this.props;
  //     if (!memberships) {
  //       if (id) {
  //         setMembership(id);
  //       }
  //     } else {
  //       this.setState({
  //         ...this.state,
  //         loading: false,
  //       });
  //     }
  //   }

  //   componentWillReceiveProps = nextProps => {
  //     const {setMembership} = this.props;
  //     if (nextProps.user.memberships) {
  //       this.setState({
  //         ...this.state,
  //         loading: false,
  //       });
  //     } else if (nextProps.user.id) {
  //       setMembership(nextProps.user.id);
  //     }
  //   };
  _handleJqueryLoad = () => {};

  _handleIamportLoad = () => {};

  _onPayClick = () => {
    const amount = this.props.cost_type.cost;
    const name = this.props.user.name;
    const payname = this.props.cost_type.title;
    IMP = window.IMP; // 생략가능
    IMP.init('imp61646988'); // 'iamport' 대신 부여받은 "가맹점 식별코드"를 사용
    IMP.request_pay(
      {
        pg: 'inicis', // version 1.1.0부터 지원.
        pay_method: 'vbank',
        merchant_uid: 'merchant_' + new Date().getTime(),
        name: '주문명 : ' + payname,
        amount: amount,
        // buyer_email: 'iamport@siot.do',
        buyer_name: name,
        // buyer_tel: '010-1234-5678',
        // buyer_addr: '서울특별시 강남구 삼성동',
        // buyer_postcode: '123-456',
        m_redirect_url: 'https://localhost:3000',
      },
      function(rsp) {
        var msg;
        if (rsp.success) {
          msg = '결제가 완료되었습니다.';
          msg += '고유ID : ' + rsp.imp_uid;
          msg += '상점 거래ID : ' + rsp.merchant_uid;
          msg += '결제 금액 : ' + rsp.paid_amount;
          msg += '카드 승인번호 : ' + rsp.apply_num;
        } else {
          msg = '결제에 실패하였습니다.';
          msg += '에러내용 : ' + rsp.error_msg;
        }
        alert(msg);
      }
    );
  };

  render() {
    //이름, 등록지점, 시작시각, 만료시각, cost_type(가격, 일수, title)
    const {
      sel_branch: {branch_name},
      start_date,
      start_time,
      end_datetime,
      cost_type: {cost},
      all_info_setup,
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

        <Payment
          branch_name={branch_name}
          start_date={start_date}
          start_time={start_time}
          end_datetime={end_datetime}
          cost={cost}
          all_info_setup={all_info_setup}
          onPayClick={this._onPayClick}
        />
      </Fragment>
    );
  }
}

export default Container;
