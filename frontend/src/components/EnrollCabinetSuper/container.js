import React, { Component } from "react";
import EnrollCabinetSuper from "./presenter";

class Container extends Component {
  state = {
    loading: true,
    cabinet_list_is_first: true,
    scroll_first: true
  };

  componentWillMount() {
    const { setEnrollCabinetTargetUser, now_view_user } = this.props;
    setEnrollCabinetTargetUser(now_view_user);
  }

  componentDidMount() {
    const { sel_branch } = this.props;

    if (sel_branch) {
      this.setState({
        ...this.state,
        loading: false
      });
    }

    const target = document.getElementById("regist_content");
    target.scrollTop = target.scrollHeight;
  }

  componentWillReceiveProps(nextProps) {
    const { sel_branch, sel_cabinet_set } = nextProps;
    if (sel_branch) {
      this.setState({
        ...this.state,
        loading: false
      });
    }

    if (sel_cabinet_set) {
      this.setState({
        ...this.state,
        loading: false,
        cabinet_list_is_first: false
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.state.loading && this.state.scroll_first) {
      this.setState({ ...this.state, scroll_first: false });
    }

    const target = document.getElementById("regist_content");
    target.scrollTop = target.scrollHeight;
  }

  render() {
    const {
      sel_cost_type,
      sel_branch,
      sel_cabinet_set,
      cabinets_to_enroll
    } = this.props;
    return (
      <EnrollCabinetSuper
        sel_cost_type={sel_cost_type}
        sel_branch={sel_branch}
        loading={this.state.loading}
        sel_cabinet_set={sel_cabinet_set}
        cabinets_to_enroll={cabinets_to_enroll}
        cabinet_list_is_first={this.state.cabinet_list_is_first}
      />
    );
  }
}
export default Container;
