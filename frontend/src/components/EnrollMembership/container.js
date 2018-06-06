import React, { Component } from "react";
import EnrollMembership from "./presenter";

class Container extends Component {
  componentWillMount() {
    const { fetchBranches, fetchMyCabinets } = this.props;
    fetchBranches();
    fetchMyCabinets();
  }

  render() {
    const {
      branches,
      profile_image,
      username,
      name,
      sel_branch,
      sel_cost_type,
      sel_cabinet_set
    } = this.props;
    return (
      <EnrollMembership
        branches={branches}
        profile_image={profile_image}
        username={username}
        name={name}
        sel_branch={sel_branch}
        sel_cost_type={sel_cost_type}
        sel_cabinet_set={sel_cabinet_set}
      />
    );
  }
}

export default Container;
