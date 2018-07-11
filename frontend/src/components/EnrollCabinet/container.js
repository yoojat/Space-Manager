import React, { Component } from "react";
import EnrollCabinet from "./presenter";
import { scroller } from "react-scroll";

class Container extends Component {
  state = {
    loading: true,
    cabinet_list_is_first: true,
    scroll_first: true
  };

  componentWillMount() {
    const { setEnrollCabinetTargetUser, user } = this.props;
    setEnrollCabinetTargetUser(user);
  }

  componentDidMount() {
    const { sel_branch } = this.props;
    if (!this.state.loading) {
      scroller.scrollTo("EnrollCabinet", {
        duration: 1500,
        delay: 100,
        smooth: true,
        offset: 50
      });
    }

    if (sel_branch) {
      this.setState({
        ...this.state,
        loading: false
      });
    }
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
      scroller.scrollTo("EnrollCabinet", {
        duraeion: 1500,
        delay: 100,
        smooth: true,
        offset: 50
      });
      this.setState({ ...this.state, scroll_first: false });
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
        cabinet_list_is_first={this.state.cabinet_list_is_first}
      />
    );
  }
}
export default Container;
