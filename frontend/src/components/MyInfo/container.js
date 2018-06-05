import React, { Component } from "react";
import MyInfo from "./presenter";

class Container extends Component {
  state = {
    loading: true
  };

  //MyInfo를 불러올 때 자신의 멤버쉽정보와 사물함 정보를 불러옴
  componentWillMount() {
    const { fetchMyMemberships, fetchMyCabinets } = this.props;
    fetchMyMemberships(); //ok
    fetchMyCabinets(); //ok
  }

  //멤버쉽정보와 캐비넷 정보가 있으면 로딩을 끝낸다
  componentDidMount() {
    const { my_memberships, my_cabinets } = this.props;
    if (my_memberships && my_cabinets) {
      this.setState({ ...this.state, loading: false });
    }
  }

  //멤버쉽정보와 캐비넷 정보가 있으면 로딩을 끝낸다
  componentDidUpdate(prevProps, prevState) {
    const { my_memberships, my_cabinets } = this.props;
    if (this.state.loading) {
      if (my_memberships && my_cabinets) {
        this.setState({ ...this.state, loading: false });
      }
    }
  }
  render() {
    const {
      my_memberships,
      my_cabinets,
      profile_image,
      username,
      name
    } = this.props;

    return (
      <MyInfo
        loading={this.state.loading}
        my_memberships={my_memberships}
        my_cabinets={my_cabinets}
        profile_image={profile_image}
        username={username}
        name={name}
      />
    );
  }
}

export default Container;
