import React, { Component } from "react";
import EnrollMembership from "./presenter";
import { scroller } from "react-scroll";

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
      setEnrollMembershipInfoNotSetup,
      SetShowEnrollCabinetIsFirstFalse,
      enrollMembershipComplete,
      setEnrollMembershipNotComplete
    } = this.props;

    if (enrollMembershipComplete) {
      setEnrollMembershipNotComplete();
    }

    fetchSelBranch(sel_branch.id); // 사물함을 위한 지점 정보 저장
    setIsEnrollCabinet();
    setEnrollMembershipInfoNotSetup();
    SetShowEnrollCabinetIsFirstFalse();
  };

  _onEnrollNoCabinetClick = () => {
    const {
      setIsEnrollCabinetNo,
      clearEnrollCabinet,
      setEnrollMembershipInfoSetup,
      enrollMembershipComplete,
      setEnrollMembershipComplete
    } = this.props;
    if (!enrollMembershipComplete) {
      setEnrollMembershipComplete();
    }
    clearEnrollCabinet();
    setIsEnrollCabinetNo();
    setEnrollMembershipInfoSetup();
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
      sel_start_datetime
    } = nextProps;

    if (branches && username && name && name && my_memberships) {
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

    if (
      !cabinets_to_enroll.length &&
      enrollMembershipComplete &&
      sel_start_datetime
    ) {
      clearSelCabinetInfo();
      setEnrollMembershipNotComplete();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { sel_cost_type, sel_start_datetime } = this.props;
    if (sel_cost_type && !sel_start_datetime) {
      if (this.state.scroll_first) {
        scroller.scrollTo("isAddCabinet", {
          duration: 1500,
          delay: 100,
          smooth: true,
          offset: 50
        });
      }
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
      setEnrollMembershipTargetUser,
      user
    } = this.props;
    fetchBranches();
    fetchMyCabinets();
    fetchMyMemberships();
    clearEnrollMembership();
    clearExtendCabinet();
    clearEnrollCabinet();
    setEnrollMembershipTargetUser(user);
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
      <EnrollMembership
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
      />
    );
  }
}

export default Container;
