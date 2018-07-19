import React, { Component } from "react";
import Staff from "./presenter";

class Container extends Component {
  state = {
    now_page: null
  };

  _onPageButtonClick = e => {
    const children = e.target.parentElement.childNodes;
    console.log(children);
    children.forEach(child => {
      console.log(child);
      child.style.color = "inherit";
    });
    e.target.style.color = "#007fff";
    this.setState({
      ...this.state,
      now_page: e.target.dataset.value
    });
  };

  render() {
    return (
      <Staff
        onPageButtonClick={this._onPageButtonClick}
        now_page={this.state.now_page}
      />
    );
  }
}
export default Container;
