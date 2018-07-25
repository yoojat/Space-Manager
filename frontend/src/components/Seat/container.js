import React, { Component } from "react";
import Seat from "./presenter";
import moment from "moment";

class Container extends Component {
  state = {
    loading: false
  };

  _onSeatClick = () => {
    const {
      id,
      memberships,
      now_using, //좌석의 현재상태
      my_now_using,
      seat_number,
      handleSeatClick,
      changeSeat
    } = this.props;

    //멤버쉽 확인
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
      alert("멤버쉽 등록 후 좌석을 배정해주세요!");
      return;
    }
    ///////////////////////////////////////

    //선택한 좌석 상태 확인
    if (now_using) {
      alert("해당 좌석은 현재 이용중입니다!");
      return;
    }
    //////////////////////////////////////

    //자신의 좌석 상태 확인
    if (my_now_using) {
      alert(
        `${
          my_now_using.seat_number
        }번 좌석을 반납하고 ${seat_number}번 좌석을 배정합니다`
      );
      changeSeat(my_now_using.id, id);

      return;
    }

    handleSeatClick();

    // const { handleSeatClick } = this.props;
    // this.setState({ ...this.state, loading: true });
    // handleSeatClick();
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.now_using !== this.props.now_using) {
      this.setState({ ...this.state, loading: false });
    }
  }
  render() {
    const { is_processing } = this.props;
    return (
      <Seat
        {...this.props}
        loading={this.state.loading}
        onSeatClick={this._onSeatClick}
        is_processing={is_processing}
      />
    );
  }
}

export default Container;
