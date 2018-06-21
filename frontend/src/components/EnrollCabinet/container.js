import React, { Component } from "react";
import EnrollCabinet from "./presenter";

class Container extends Component {
  state = {
    loading: true
  };

  componentDidMount() {
    const { sel_branch } = this.props;
    if (sel_branch) {
      this.setState({
        ...this.state,
        loading: false
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { sel_branch } = nextProps;
    if (sel_branch) {
      this.setState({
        ...this.state,
        loading: false
      });
    }
  }

  render() {
    const {
      sel_cost_type,
      sel_branch,
      sel_cabinet_set,
      cabinets_to_enroll
    } = this.props;
    return (
      <EnrollCabinet
        sel_cost_type={sel_cost_type}
        sel_branch={sel_branch}
        loading={this.state.loading}
        sel_cabinet_set={sel_cabinet_set}
        cabinets_to_enroll={cabinets_to_enroll}
      />
    );
  }
}
export default Container;
