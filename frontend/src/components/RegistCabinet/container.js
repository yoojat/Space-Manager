import React, { Component } from "react";
import RegistCabinet from "./presenter";

class Container extends Component {
  state = { loading: true };

  componentWillMount() {
    const { fetchMyCabinets } = this.props;
    fetchMyCabinets();
  }

  componentWillReceiveProps(nextProps) {
    const { is_fetched } = nextProps;
    if (is_fetched) {
      this.setState({ ...this.state, loading: false });
    }
  }

  render() {
    const { my_cabinets } = this.props;

    return (
      <RegistCabinet my_cabinets={my_cabinets} loading={this.state.loading} />
    );
  }
}
export default Container;
