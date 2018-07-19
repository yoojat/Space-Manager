import React, { Component } from "react";
import SearchMember from "./presenter";

class Container extends Component {
  state = { keyword: "" };

  _onInputChange = e => {
    this.setState({
      ...this.state,
      keyword: e.target.value
    });
  };

  _doSearch = () => {
    const { keyword } = this.state;
    const { fetchSearchedMembers } = this.props;
    if (keyword) {
      fetchSearchedMembers(keyword);
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

  render() {
    const { found_users } = this.props;
    return (
      <SearchMember
        onInputChange={this._onInputChange}
        onSearchButtonClick={this._onSearchButtonClick}
        keyword={this.state.keyword}
        found_users={found_users}
        handleOnKeyUp={this._handleOnKeyUp}
      />
    );
  }
}
export default Container;
