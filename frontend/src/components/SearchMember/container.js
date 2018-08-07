import React, { Component } from "react";
import SearchMember from "./presenter";

class Container extends Component {
  state = { keyword: "", scope: "name" };

  _onInputChange = e => {
    this.setState({
      ...this.state,
      keyword: e.target.value
    });
  };

  _ohHandleSelectChange = e => {
    this.setState({
      ...this.state,
      scope: e.target.value
    });
  };

  _doSearch = () => {
    const { keyword, scope } = this.state;
    const { fetchSearchedMembers } = this.props;
    if (keyword) {
      fetchSearchedMembers(keyword, scope);
      this.setState({ ...this.state, keyword: "" });
    }
  };

  _onSearchButtonClick = () => {
    this._doSearch();
  };

  _handleOnKeyUp = e => {
    const eventKeyCode = e.keyCode;
    if (eventKeyCode === 13) {
      this._doSearch();
    }
  };

  _onMemberClick = userid => {
    const { fetchNowViewMember, fetchNowViewMemberSeatHistory } = this.props;
    fetchNowViewMember(userid);
    fetchNowViewMemberSeatHistory(userid);
  };

  render() {
    const { found_users } = this.props;
    return (
      <SearchMember
        onInputChange={this._onInputChange}
        onSearchButtonClick={this._onSearchButtonClick}
        keyword={this.state.keyword}
        found_users={found_users}
        handleOnKeyUp={this._handleOnKeyUp}
        onMemberClick={this._onMemberClick}
        ohHandleSelectChange={this._ohHandleSelectChange}
        scope={this.state.scope}
      />
    );
  }
}
export default Container;
