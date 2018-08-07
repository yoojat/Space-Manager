import React, { Component } from "react";
import AdminAllocateCabinet from "./presenter";

class Container extends Component {
  state = {
    keyword: "",
    confirm_show: false
  };

  _handleChange = event => {
    this.setState({
      ...this.state,
      keyword: event.target.value
    });
  };

  _handleSubmit = event => {
    const { getUsersBySearch } = this.props;
    getUsersBySearch(this.state.keyword);
    event.preventDefault();
  };

  _onMemberClick = user_id => {
    const { getUserForAllocate } = this.props;
    getUserForAllocate(user_id);
    this.setState({
      ...this.state,
      confirm_show: true
    });
  };

  componentWillUnmount() {
    const { setSearchedMembersNull } = this.props;
    setSearchedMembersNull();
  }

  render() {
    const { searched_members } = this.props;
    return (
      <AdminAllocateCabinet
        handleChange={this._handleChange}
        handleSubmit={this._handleSubmit}
        keyword={this.state.keyword}
        searched_members={searched_members}
        onMemberClick={this._onMemberClick}
        confirm_show={this.state.confirm_show}
      />
    );
  }
}
export default Container;
