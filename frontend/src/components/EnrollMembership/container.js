import React, { Component } from "react";
import EnrollMembership from "./presenter";

class Container extends Component {
  state = {
    loading: true,
    showEnrollCabinet_is_first: true
  };

  _onEnrollYesCabinetClick = () => {
    const { setIsEnrollCabinet, fetchSelBranch, sel_branch } = this.props;
    fetchSelBranch(sel_branch.id); // 사물함을 위한 지점 정보 저장
    setIsEnrollCabinet();
  };
  _onEnrollNoCabinetClick = () => {
    const { setIsEnrollCabinetNo } = this.props;
    setIsEnrollCabinetNo();
    //FIXME: 사물함 등록 정보 초기화 시켜야됨

  };

  componentDidMount() {
    const { branches, username, name, my_memberships } = this.props;
    if (branches && username && name && name && my_memberships) {
      this.setState({
        ...this.state,
        loading: false
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { branches, username, name, my_memberships } = nextProps;
    if (branches && username && name && name && my_memberships) {
      this.setState({
        ...this.state,
        loading: false,
        showEnrollCabinet_is_first:
          this.state.showEnrollCabinet_is_first ?
            (this.props.is_enroll_cabinet !== nextProps.is_enroll_cabinet ?
              false : this.state.showEnrollCabinet_is_first) : this.state.showEnrollCabinet_is_first

      });
    }
  }

  componentWillMount() {
    const { fetchBranches, fetchMyCabinets, fetchMyMemberships } = this.props;
    fetchBranches();
    fetchMyCabinets();
    fetchMyMemberships();
    // setClearExtendMembership();
  }

  render() {
    const {
      profile_image,
      username,
      name,
      sel_branch,
      sel_cost_type,
      sel_cabinet_set,
      all_info_setup,
      my_memberships,
      my_cabinets,
      is_enroll_cabinet
    } = this.props;
    return <EnrollMembership
      profile_image={profile_image}
      username={username}
      name={name}
      sel_branch={sel_branch}
      sel_cost_type={sel_cost_type}
      sel_cabinet_set={sel_cabinet_set}
      all_info_setup={all_info_setup}
      my_memberships={my_memberships}
      loading={this.state.loading}
      my_cabinets={my_cabinets}
      is_enroll_cabinet={is_enroll_cabinet}
      onEnrollYesCabinetClick={this._onEnrollYesCabinetClick}
      onEnrollNoCabinetClick={this._onEnrollNoCabinetClick}
      showEnrollCabinet_is_first={this.state.showEnrollCabinet_is_first}
    />;
  }
}

export default Container;
