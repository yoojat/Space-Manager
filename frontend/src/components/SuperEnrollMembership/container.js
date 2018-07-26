import React, { Component } from "react";
import SuperEnrollMembership from "./presenter";

class Container extends Component {
  state = {
    loading: true,
    scroll_first: true
  };

  _onEnrollYesCabinetClick = () => {
    const {
      setIsEnrollCabinet,
      fetchSelBranch,
      sel_branch,
      SetShowEnrollCabinetIsFirstFalse,
      enrollMembershipComplete,
      setEnrollMembershipNotComplete
    } = this.props;

    if (enrollMembershipComplete) {
      setEnrollMembershipNotComplete();
    }

    fetchSelBranch(sel_branch.id); // 사물함을 위한 지점 정보 저장
    setIsEnrollCabinet();
    SetShowEnrollCabinetIsFirstFalse();
  };

  _onEnrollNoCabinetClick = () => {
    const {
      setIsEnrollCabinetNo,
      clearEnrollCabinet,
      enrollMembershipComplete,
      setEnrollMembershipComplete
    } = this.props;
    if (!enrollMembershipComplete) {
      setEnrollMembershipComplete();
    }
    clearEnrollCabinet();
    setIsEnrollCabinetNo();
  };

  _onExtendYesCabinetClick = () => {
    const {
      enrollMembershipComplete,
      setEnrollMembershipNotComplete
    } = this.props;
    if (enrollMembershipComplete) {
      setEnrollMembershipNotComplete();
    }
  };

  _onExtendNoCabinetClick = () => {
    const {
      // setEnrollMembershipInfoSetup,
      enrollMembershipComplete,
      setEnrollMembershipComplete
    } = this.props;
    if (!enrollMembershipComplete) {
      setEnrollMembershipComplete();
    }
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
    const {
      branches,
      username,
      name,
      my_memberships,
      sel_cabinet_cost_type,
      enrollMembershipComplete,
      setEnrollMembershipComplete,
      setEnrollMembershipNotComplete,
      cabinets_to_enroll,
      clearSelCabinetInfo,
      sel_start_datetime,
      sel_extend_cabinet_cost_type
    } = nextProps;

    if (branches && username && name && my_memberships) {
      this.setState({
        ...this.state,
        loading: false,
        showEnrollCabinet_is_first: this.state.showEnrollCabinet_is_first
          ? this.props.is_enroll_cabinet !== nextProps.is_enroll_cabinet
            ? false
            : this.state.showEnrollCabinet_is_first
          : this.state.showEnrollCabinet_is_first
      });
    }

    if (sel_cabinet_cost_type && !enrollMembershipComplete) {
      setEnrollMembershipComplete();
    }
    if (sel_extend_cabinet_cost_type && !enrollMembershipComplete) {
      setEnrollMembershipComplete();
    }

    if (
      !cabinets_to_enroll.length &&
      enrollMembershipComplete &&
      sel_start_datetime
    ) {
      clearSelCabinetInfo();
      setEnrollMembershipNotComplete();
    }
  }

  componentWillMount() {
    const {
      fetchBranches,
      getUsingCabinets,
      clearEnrollMembership,
      clearExtendCabinet,
      clearEnrollCabinet,
      clearExtendMembership,
      setEnrollMembershipTargetUser,
      user
    } = this.props;
    fetchBranches();
    getUsingCabinets(user.id);
    clearEnrollMembership(); //멤버쉽 등록 초기화
    clearExtendCabinet(); // 사물함 연장 초기화
    clearEnrollCabinet(); // 사물함 등록 초기화
    clearExtendMembership(); // 멤버쉽 연장 초기화
    setEnrollMembershipTargetUser(user);
  }

  componentWillUnmount() {
    const {
      fetchBranches,
      getUsingCabinets,
      clearEnrollMembership,
      clearExtendCabinet,
      clearEnrollCabinet,
      clearExtendMembership,
      setExtendMembershipNotComplete,
      setEnrollMembershipNotComplete,
      user
    } = this.props;
    fetchBranches();
    getUsingCabinets(user.id);
    clearEnrollMembership(); //멤버쉽 등록 초기화
    clearExtendCabinet(); // 사물함 연장 초기화
    clearEnrollCabinet(); // 사물함 등록 초기화
    clearExtendMembership(); // 멤버쉽 연장 초기화
    setExtendMembershipNotComplete();
    setEnrollMembershipNotComplete();
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
      is_enroll_cabinet,
      showEnrollCabinet_is_first,
      enrollMembershipComplete
    } = this.props;
    return (
      <SuperEnrollMembership
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
        showEnrollCabinet_is_first={showEnrollCabinet_is_first}
        enrollMembershipComplete={enrollMembershipComplete}
        onExtendNoCabinetClick={this._onExtendNoCabinetClick}
        onExtendYesCabinetClick={this._onExtendYesCabinetClick}
      />
    );
  }
}

export default Container;
