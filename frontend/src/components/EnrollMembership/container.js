import React, { Component } from "react";
import EnrollMembership from "./presenter";

class Container extends Component {
  state = {
    loading: true,
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
        loading: false
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
      // is_set_extend_membership,
      // is_extend_membership
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
        // is_set_extend_membership = {is_set_extend_membership}
        // is_extend_membership={is_extend_membership}
      />
    );
  }
}

export default Container;
