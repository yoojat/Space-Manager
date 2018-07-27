import React, { Component } from "react";
import LoungeSeatAdmin from "./presenter";

class Container extends Component {
  state = { loading: true };

  componentDidMount() {
    const { sel_branch_for_seat_man } = this.props;
    if (sel_branch_for_seat_man) {
      this.setState({
        ...this.state,
        loading: false
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.sel_branch_for_seat_man) {
      if (
        this.props.sel_branch_for_seat_man !== nextProps.sel_branch_for_seat_man
      ) {
        this.setState({
          ...this.state,
          loading: true
        });
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.loading) {
      if (this.props.sel_branch_for_seat_man) {
        this.setState({
          ...this.state,
          loading: false
        });
      }
    }
  }

  render() {
    const { sel_branch_for_seat_man } = this.props;
    return (
      <LoungeSeatAdmin
        sel_branch_for_seat_man={sel_branch_for_seat_man}
        loading={this.state.loading}
      />
    );
  }
}
export default Container;
