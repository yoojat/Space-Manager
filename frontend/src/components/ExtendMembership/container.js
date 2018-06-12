import React, { Component } from "react";
import ExtendMembership from "./presenter";

class Container extends Component {
  state = {
    loading: true,
    showSelBranch: false
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
    const { username, name, my_memberships } = nextProps;
    if (username && name && name && my_memberships) {
      this.setState({
        ...this.state,
        loading: false
      });
    }
  }

  componentWillMount() {
    const { fetchBranches, fetchMyCabinets, fetchMyMemberships } = this.props;
    fetchBranches();
    fetchMyCabinets();
    fetchMyMemberships();
  }

  render() {
    const {
      profile_image,
      username,
      name,
      my_memberships,
      membership_to_extended,
      sel_cost_type,
      my_cabinets,
      all_info_setup
    } = this.props;
    return (
      <ExtendMembership
        profile_image={profile_image}
        username={username}
        name={name}
        my_memberships={my_memberships}
        loading={this.state.loading}
        membership_to_extended={membership_to_extended}
        sel_cost_type={sel_cost_type}
        my_cabinets={my_cabinets}
        all_info_setup={all_info_setup}
      />
    );
  }
}

export default Container;
