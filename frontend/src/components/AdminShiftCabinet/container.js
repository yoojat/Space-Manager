import React, { Component } from "react";
import AdminShiftCabinet from "./presenter";

class Container extends Component {
  state = {
    loading: true
  };

  componentWillMount() {
    const { sel_cabinet, setCabinetForStaffShiftCabinet } = this.props;

    setCabinetForStaffShiftCabinet(sel_cabinet);
  }

  componentDidMount() {
    const { sel_cabinet_for_shift } = this.props;
    if (sel_cabinet_for_shift) {
      this.setState({
        ...this.state,
        loading: false
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { sel_cabinet_for_shift } = nextProps;
    if (sel_cabinet_for_shift) {
      this.setState({
        ...this.state,
        loading: false
      });
    }
  }

  render() {
    const { sel_branch, target_cabinet } = this.props;
    return (
      <AdminShiftCabinet
        loading={this.state.loading}
        sel_branch={sel_branch}
        target_cabinet={target_cabinet}
      />
    );
  }
}
export default Container;
