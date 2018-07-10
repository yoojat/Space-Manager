import React, { Component } from "react";
import ExtendMembership from "./presenter";

class Container extends Component {
  state = {
    loading: true,
    showSelBranch: false
  };

  _onExtendYesCabinetClick = () => {
    const {
      // setEnrollMembershipInfoSetup,
      extendMembershipComplete,
      setExtendMembershipNotComplete
    } = this.props;
    if (extendMembershipComplete) {
      setExtendMembershipNotComplete();
    }
    // setEnrollMembershipInfoSetup(); //멤버쉽 등록 완료
  };

  _onExtendNoCabinetClick = () => {
    const {
      // setEnrollMembershipInfoSetup,
      extendMembershipComplete,
      setExtendMembershipComplete
    } = this.props;
    if (!extendMembershipComplete) {
      setExtendMembershipComplete();
    }
  };

  _setExtendInfoTotalSetupTrue = () => {
    const { setExtendMembershipComplete } = this.props;
    setExtendMembershipComplete();
  };

  _setExtendInfoTotalSetupFalse = () => {
    const { setExtendMembershipNotComplete } = this.props;
    setExtendMembershipNotComplete();
  };

  componentDidMount() {
    const { username, name, my_memberships } = this.props;
    if (username && name && name && my_memberships) {
      this.setState({
        ...this.state,
        loading: false
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      username,
      name,
      my_memberships,
      sel_cabinet_cost_type,
      setExtendMembershipComplete,
      sel_cabinet_costtype
    } = nextProps;
    if (username && name && name && my_memberships) {
      this.setState({
        ...this.state,
        loading: false
      });
    }
    if (sel_cabinet_cost_type) {
      // 등록 사물함이 완료 되었을 때
      setExtendMembershipComplete();
    }

    if (sel_cabinet_costtype) {
      // 연장 사물함이 완료 되었을 때
      setExtendMembershipComplete();
    }
  }

  componentWillMount() {
    const {
      fetchBranches,
      fetchMyCabinets,
      fetchMyMemberships,
      clearEnrollMembership,
      clearExtendCabinet,
      clearEnrollCabinet,
      clearExtendMembership
    } = this.props;

    fetchBranches();
    fetchMyCabinets();
    fetchMyMemberships();
    clearEnrollMembership();
    clearExtendCabinet();
    clearEnrollCabinet();
    clearExtendMembership();
  }

  _onEnrollCabinetClick = () => {
    const {
      setIsEnrollCabinet,
      showEnrollCabinet_is_first,
      SetShowEnrollCabinetIsFirstFalse,
      membership_extend,
      fetchSelBranch
    } = this.props;
    if (showEnrollCabinet_is_first) {
      SetShowEnrollCabinetIsFirstFalse();
    }
    setIsEnrollCabinet();
    this._setExtendInfoTotalSetupFalse();
    fetchSelBranch(membership_extend.branch.id);
  };

  _onEnrollNoCabinetClick = () => {
    const {
      setIsEnrollCabinetNo,
      showEnrollCabinet_is_first,
      SetShowEnrollCabinetIsFirstFalse,
      resetEnrollCabinet
    } = this.props;
    if (showEnrollCabinet_is_first) {
      SetShowEnrollCabinetIsFirstFalse();
    }
    SetShowEnrollCabinetIsFirstFalse();
    setIsEnrollCabinetNo();
    this._setExtendInfoTotalSetupTrue();
    resetEnrollCabinet();
  };

  render() {
    const {
      profile_image,
      username,
      name,
      my_memberships,
      membership_extend,
      sel_cost_type,
      my_cabinets,
      membership_extend_complete,
      cabinet_enroll_complete,
      cabinets_to_enroll,
      is_enroll_cabinet,
      showEnrollCabinet_is_first,
      extendMembershipComplete
    } = this.props;
    return (
      <ExtendMembership
        profile_image={profile_image}
        username={username}
        name={name}
        my_memberships={my_memberships}
        loading={this.state.loading}
        membership_extend={membership_extend}
        sel_cost_type={sel_cost_type}
        my_cabinets={my_cabinets}
        membership_extend_complete={membership_extend_complete}
        cabinet_enroll_complete={cabinet_enroll_complete}
        is_enroll_cabinet={is_enroll_cabinet}
        showEnrollCabinet_is_first={showEnrollCabinet_is_first}
        onEnrollCabinetClick={this._onEnrollCabinetClick}
        onEnrollNoCabinetClick={this._onEnrollNoCabinetClick}
        cabinets_to_enroll={cabinets_to_enroll}
        extendMemershipComplete={extendMembershipComplete}
        onExtendYesCabinetClick={this._onExtendYesCabinetClick}
        onExtendNoCabinetClick={this._onExtendNoCabinetClick}
        extendMembershipComplete={extendMembershipComplete}
      />
    );
  }
}

export default Container;
